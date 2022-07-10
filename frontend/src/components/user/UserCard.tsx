import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  useMutation,
} from "@apollo/client";
import {
  Avatar,
  Text,
  Button,
  Stack,
  Paper,
  Modal,
  TextInput,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { UPDATE_CHAT, READ_CHAT } from "../../queries/chats";

interface UserCardProps {
  username: string;
}

export default function UserCard(props: UserCardProps) {
  const [opened, setOpened] = useState(false);

  return (
    <Paper withBorder p={20}>
      <Stack p={10} align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
          size={120}
          radius={120}
          mx="auto"
        />
        <Text align="center" size="lg" weight={500}>
          {props.username}
        </Text>
        <Button color="dark" variant="outline" onClick={() => setOpened(true)}>
          Send Message
        </Button>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Message me."
        >
          <Stack>
            <TextInput label="Send Message" placeholder="Enter a message..." />
            <Space />
            <Button>Send</Button>
          </Stack>
        </Modal>
      </Stack>
    </Paper>
  );
}
