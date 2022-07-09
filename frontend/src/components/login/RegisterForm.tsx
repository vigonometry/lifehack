import { useMutation } from "@apollo/client";
import {
  Button,
  Group,
  PasswordInput,
  TextInput,
  Select,
  Space,
  Stack,
  Paper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import {
  CLIENT_REGISTER_MUTATION,
  COUNSELLOR_REGISTER_MUTATION,
} from "../../queries/auth";
import { AUTH_TOKEN } from "../../constants/authToken";
import { useContext } from "react";
import { UserContext } from "../../services/userContextProvider";

const RegisterForm = () => {
  const userObj = useContext(UserContext);
  const form = useForm({
    initialValues: {
      role: "Client",
      email: "",
      password: "",
      username: "",
      institution: "Select Institution",
      course: "Select Course",
    },
  });

  const [startRegisterClient] = useMutation(CLIENT_REGISTER_MUTATION, {
    variables: {
      username: form.values.username,
      email: form.values.email,
      password: form.values.password,
    },
    onCompleted: ({ registerClient }) => {
      if (registerClient.response) {
        //localStorage.setItem(AUTH_TOKEN, registerClient.response);
        userObj.setToken(registerClient.response);
        window.location.reload();
      } else {
        showNotification({
          title: "Client Register Failed",
          message: registerClient.error,
        });
      }
    },
  });

  const [startRegisterCounsellor] = useMutation(COUNSELLOR_REGISTER_MUTATION, {
    variables: {
      username: form.values.username,
      email: form.values.email,
      password: form.values.password,
      institution: form.values.institution,
      course: form.values.course,
    },
    onCompleted: ({ registerCounsellor }) => {
      if (registerCounsellor.response) {
        //localStorage.setItem(AUTH_TOKEN, registerCounsellor.response);
        userObj.setToken(registerCounsellor.response);
        window.location.reload();
      } else {
        showNotification({
          title: "Counsellor Register Failed",
          message: registerCounsellor.error,
        });
      }
    },
  });

  const handleSubmit = () =>
    form.values.role === "Client"
      ? startRegisterClient()
      : startRegisterCounsellor();

  return (
    <Paper withBorder shadow="md" p={20}>
      <Stack>
        <Select
          size="md"
          key="Role"
          label="Register as"
          data={["Client", "Counsellor"]}
          {...form.getInputProps("role")}
        />
        <TextInput
          placeholder="Username"
          label="Username"
          size="md"
          {...form.getInputProps("username")}
        />
        <TextInput
          placeholder="xxx@email.com"
          label="Email"
          size="md"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          size="md"
          {...form.getInputProps("password")}
        />
        {form.values.role !== "Client" ? (
          <Stack align="baseline">
            <Select
              size="md"
              key="Institution"
              label="Institution"
              data={["University", "Polytechnic", "ITE"]}
              {...form.getInputProps("institution")}
            />
            <TextInput
              placeholder="Username"
              label="Username"
              size="md"
              {...form.getInputProps("username")}
            />
          </Stack>
        ) : (
          <></>
        )}
        <Button onClick={handleSubmit}>Register Now</Button>
      </Stack>
    </Paper>
  );
};

export default RegisterForm;
