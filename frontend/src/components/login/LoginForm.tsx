import { useMutation } from "@apollo/client";
import {
  Button,
  TextInput,
  PasswordInput,
  Space,
  Stack,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { LOGIN_MUTATION } from "../../queries/auth";
import { AUTH_TOKEN } from "../../constants/authToken";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const [startLogin] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: form.values.username,
      password: form.values.password,
    },
    onCompleted: ({ login }) => {
      if (login.response) {
        console.log("Response login");
        localStorage.setItem(AUTH_TOKEN, login.response);
        window.location.reload();
      } else {
        console.log("Response err", login);
        setLoading(false);
        showNotification({
          title: "Login failed",
          message: login.error,
        });
      }
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    startLogin();
  };

  return (
    <Paper withBorder shadow='sm' p={20}>
      <Stack>
        <TextInput
          placeholder="Username"
          label="Username"
          size="md"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          size="md"
          {...form.getInputProps("password")}
        />
        <Space />
        <Button radius="md" size="md" onClick={handleSubmit} loading={loading}>
          Log In
        </Button>
      </Stack>
    </Paper>
  );
};

export default LoginForm;
