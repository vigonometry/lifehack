import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            response
            error
        }
    }
`

export const CLIENT_REGISTER_MUTATION = gql`
    mutation ClientRegisterMutation($username: String!, $email: String!, $password: String!) {
        createClient(username: $username, email: $email, password: $password) {
            response
            error
        }
    }
`
export const COUNSELLOR_REGISTER_MUTATION = gql`
    mutation CounsellorRegisterMutation($username: String!, $email: String!, $password: String!, $institution: String!, $course: String!) {
        createCounsellor(username: $username, email: $email, password: $password, institution: $institution, course: $course) {
            response
            error
        }
    }
`

export const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            _id
            username
            chats {
                clientId
                counsellorId
                messages
            }
            ... on Counsellor {
                institution
                course
            }
        }
    }
`