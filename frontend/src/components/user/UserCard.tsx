import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  OperationVariables,
  useMutation,
  useQuery,
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
import { formList, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { UPDATE_CHAT, READ_CHAT, CREATE_CHAT } from "../../queries/chats";
import { UserContext } from "../../services/userContextProvider";

interface UserCardProps {
  username: string;
}

export default function UserCard(props: UserCardProps) {
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState([]);

  const setOpenModal = () => {
    setOpened(true);
    readMessages();
  }

  const form = useForm({
    initialValues: {
      username: props.username,
      message: "",
    },
  });

  const [readMessages] = useMutation(READ_CHAT, {
    variables: { userId: props.username },
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log("Get messages", data);
      setData(data.messages);
    },
    onError: (error) => {
      console.log("Get message err", error);
    },
  });

  const [sendMessage] = useMutation(CREATE_CHAT, {
    variables: {
      username: props.username,
      message: form.values.message,
    },

    onCompleted: ({ message }) => {
      if (message.response) {
        window.location.reload();
      } else {
        console.log("Response err", message);
        showNotification({
          title: "Error sending message.",
          message: message.error,
        });
      }
    },
  });

  const handleSubmit = () => {
    sendMessage();
  };

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
        <Button color="dark" variant="outline" onClick={setOpenModal}>
          Send Message
        </Button>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Message me."
        >
          <Stack>
            <ul>
              {data.map((msg) => (
                <li>msg</li>
              ))}
            </ul>
            <TextInput label="Send Message" placeholder="Enter a message..." />
            <Space />
            <Button onClick={handleSubmit}>Send</Button>
          </Stack>
        </Modal>
      </Stack>
    </Paper>
  );
}
