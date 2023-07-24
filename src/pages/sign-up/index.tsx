import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChatIcon } from "@chakra-ui/icons";
import Container from "@app/components/Container";
import { useCallback, useEffect, useState } from "react";
import useAuth from "@app/hooks/useAuth";
import { useRouter } from "next/router";
import usernameFormatter from "@app/utils/usernameFormatter";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const [ready, isReady] = useState(false);

  useEffect(() => {
    if (auth.userId) {
      router.push("/");
    } else {
      isReady(true);
    }
  }, [auth, router]);

  const signInHandler = useCallback(async () => {
    setError("");

    if (!username) {
      setError("Insert a valid username");
      return;
    }

    if (!password) {
      setError("Insert a valid password");
      return;
    }

    if (password !== password2) {
      setError("The password does not match");
      return;
    }

    isLoading(true);
    const error = await auth.signup(username, password);
    setError(error);

    if (!error) {
      // Go to chat page
      router.push("/");
    } else {
      isLoading(false);
    }
  }, [username, password, password2, auth, router]);

  if (!ready) {
    return (
      <Container>
        <Box w="100%" display="flex">
          <Spinner
            margin="auto"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
            mt="22%"
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box w="100%" display="flex" flexDirection="column" alignItems="center">
        <ChatIcon boxSize={12} mt={16} color="teal" />
        <Text size="xs" mt={4} color="gray.700" maxW="sm" textAlign="center">
          Sign up and have fun chatting with everyone :D!
        </Text>

        <Stack w="100%" maxW={380} pt={8}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              disabled={loading}
              placeholder="user.name"
              value={username}
              onChange={(e) =>
                setUsername(usernameFormatter(e.currentTarget.value))
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              disabled={loading}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Confirm password</FormLabel>
            <Input
              disabled={loading}
              type="password"
              placeholder="password"
              onChange={(e) => setPassword2(e.currentTarget.value)}
            />
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={loading}
            type="button"
            onClick={signInHandler}
          >
            Submit
          </Button>

          {error && (
            <Text fontSize={14} color="red.600" maxW="sm">
              {error}
            </Text>
          )}

          <Text fontSize={14} mt={2} color="gray.700" maxW="sm">
            Already have an account?{" "}
            <Link as={NextLink} href="/sign-in" color="teal.500">
              Sign In.
            </Link>{" "}
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignUp;
