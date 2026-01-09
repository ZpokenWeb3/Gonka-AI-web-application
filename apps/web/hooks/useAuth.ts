import { useState, useCallback, useEffect } from "react";
import { useSignMessage, useAccount, useDisconnect } from "wagmi";
import {
    getNonce,
    verifyWallet,
    setAuthTokenCookie,
    hasAuthTokenCookie,
    clearAuthTokenCookie,
    clearModelCookie,
} from "../lib/auth";

type AuthState = "idle" | "authenticating" | "authenticated" | "error";

export type UseAuthReturn = {
    authState: AuthState;
    authError: string | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    authenticate: (address: string) => Promise<void>;
    logout: () => void;
    retry: () => void;
};

const getInitialAuthState = (): AuthState => {
    return hasAuthTokenCookie() ? "authenticated" : "idle";
};

const getInitialHasAttempted = (): boolean => {
    return hasAuthTokenCookie();
};

export function useAuth(): UseAuthReturn {
    const { signMessageAsync } = useSignMessage();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [authState, setAuthState] = useState<AuthState>(getInitialAuthState);
    const [authError, setAuthError] = useState<string | null>(null);
    const [hasAttempted, setHasAttempted] = useState<boolean>(getInitialHasAttempted);

    const authenticate = useCallback(
        async (walletAddress: string) => {
            if (!walletAddress) {
                setAuthError("No wallet address provided");
                setAuthState("error");
                return;
            }

            if (authState === "authenticating") {
                return;
            }

            try {
                setAuthState("authenticating");
                setAuthError(null);

                const { nonce } = await getNonce(walletAddress);

                let signature: string;
                try {
                    signature = await signMessageAsync({
                        message: nonce,
                    });
                } catch (signError) {
                    if (signError instanceof Error) {
                        if (signError.message.includes("User rejected")) {
                            throw new Error("Signature rejected by user");
                        }
                        throw new Error(`Failed to sign message: ${signError.message}`);
                    }
                    throw new Error("Failed to sign message");
                }

                const { token } = await verifyWallet({
                    address: walletAddress,
                    nonce,
                    signature,
                });

                const success = setAuthTokenCookie(token);
                if (!success) {
                    throw new Error("Failed to store authentication token");
                }

                setAuthState("authenticated");
                setHasAttempted(true);
            } catch (err) {
                console.error("Authentication failed:", err);
                setAuthState("error");

                let errorMessage = "Authentication failed";
                if (err instanceof Error) {
                    if (err.message.includes("User rejected")) {
                        errorMessage = "Signature rejected";
                    } else if (err.message.includes("network")) {
                        errorMessage = "Network error. Please try again";
                    } else if (err.message.includes("nonce")) {
                        errorMessage = "Failed to get nonce from server";
                    } else if (err.message.includes("verify")) {
                        errorMessage = "Failed to verify signature";
                    } else {
                        errorMessage = err.message;
                    }
                }

                setAuthError(errorMessage);
                clearAuthTokenCookie();
                setHasAttempted(true);
            }
        },
        [signMessageAsync, authState]
    );

    useEffect(() => {
        if (
            isConnected &&
            address &&
            authState === "idle" &&
            !hasAttempted
        ) {
            void authenticate(address);
        }
    }, [isConnected, address, authState, hasAttempted, authenticate]);


    useEffect(() => {
        if (!isConnected) {
            setHasAttempted(false);
            if (authState !== "idle") {
                setAuthState("idle");
                setAuthError(null);
            }
            clearModelCookie();
        }
    }, [isConnected, authState]);

    const logout = useCallback(() => {
        clearAuthTokenCookie();
        setAuthState("idle");
        setAuthError(null);
        setHasAttempted(false);
        disconnect();
    }, [disconnect]);

    const retry = useCallback(() => {
        if (address) {
            setHasAttempted(false);
            void authenticate(address);
        }
    }, [address, authenticate]);

    return {
        authState,
        authError,
        isAuthenticated: authState === "authenticated",
        isAuthenticating: authState === "authenticating",
        authenticate,
        logout,
        retry,
    };
}