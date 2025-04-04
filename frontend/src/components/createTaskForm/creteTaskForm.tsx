import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { sendApiRequest } from '../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../context';

export const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(
    undefined,
  );
  const [description, setDescription] = useState<
    string | undefined
  >(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(
    Priority.normal,
  );
  const [showSuccess, setShowSuccess] =
    useState<boolean>(false);

  const taskUpdatedCoontext = useContext(TaskStatusChangedContext);

  const createTaskMutation = useMutation({
    mutationFn: (data: ICreateTask) =>
      sendApiRequest(
        'http://localhost:3200/tasks',
        'POST',
        data,
      ),
  });

  function createTaskHandler() {
    if (!title || !description || !date) {
      return;
    }

    const task: ICreateTask = {
      title,
      description,
      date: date.toISOString(),
      status,
      priority,
    };

    createTaskMutation.mutate(task);
  }

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      taskUpdatedCoontext.toggle();
    }

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      width={'100%'}
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert
          severity="success"
          sx={{ width: '100%', marginBottom: '16px' }}
        >
          <AlertTitle>Success</AlertTitle>
          The task has been successfully created
        </Alert>
      )}
      <Typography mb={2} component={'h2'} variant="h6">
        Create A Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isPending}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isPending}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={createTaskMutation.isPending}
        />
        <Stack
          sx={{ width: '100%' }}
          direction={'row'}
          spacing={2}
        >
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={createTaskMutation.isPending}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={createTaskMutation.isPending}
            items={[
              {
                value: Priority.low,
                label: Priority.low,
              },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.high,
                label: Priority.high,
              },
            ]}
          />
        </Stack>
        {createTaskMutation.isPending && <LinearProgress />}
        <Button
          disabled={
            !title ||
            !description ||
            !date ||
            !status ||
            !priority
          }
          onClick={createTaskHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          Create A Task
        </Button>
      </Stack>
    </Box>
  );
};
