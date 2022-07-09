import { useMutation } from "@apollo/client";
import { Button, TextInput, PasswordInput, Space, Stack} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";

const LoginForm = () => {
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        }
    })
}