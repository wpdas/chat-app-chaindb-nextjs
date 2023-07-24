import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ChatIcon } from "@chakra-ui/icons";
import Container from "@app/components/Container";
import { useCallback, useState } from "react";
import useAuth from "@app/hooks/useAuth";
import { useRouter } from "next/router";
import usernameFormatter from "@app/utils/usernameFormatter";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();

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

    isLoading(true);
    const error = await auth.signin(username, password);
    setError(error);

    if (!error) {
      // Go to chat page
      router.push("/");
    } else {
      isLoading(false);
    }
  }, [username, password, auth, router]);

  return (
    <Container>
      <Box w="100%" display="flex" flexDirection="column" alignItems="center">
        <ChatIcon boxSize={12} mt={16} color="teal" />
        <Text size="xs" mt={4} color="gray.700" maxW="sm" textAlign="center">
          You need to sign in to use this chat!
        </Text>

        <Stack w="100%" maxW={380} pt={8}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
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
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
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
            Not have an account yet?{" "}
            <Link as={NextLink} href="/sign-up" color="teal.500">
              Sign Up.
            </Link>{" "}
            it&apos;s fast :D
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default SignIn;
