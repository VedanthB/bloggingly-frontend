import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { socket } from "./app/store";
import {
  createComment,
  deleteComment,
  replyComment,
  updateComment,
} from "./features";

import { IComment } from "./utils/TypeScript";

const SocketClient = () => {
  const { auth } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  // Create Comment
  useEffect(() => {
    if (!socket) return;

    socket.on("createComment", (data: IComment) => {
      dispatch(
        createComment({ data: data, token: auth?.access_token as string })
      );
    });

    return () => {
      socket.off("createComment");
    };
  }, [socket, dispatch]);

  // Reply Comment
  useEffect(() => {
    if (!socket) return;

    socket.on("replyComment", (data: IComment) => {
      dispatch(
        replyComment({ data: data, token: auth?.access_token as string })
      );
    });

    return () => {
      socket.off("replyComment");
    };
  }, [socket, dispatch]);

  // Update Comment
  useEffect(() => {
    if (!socket) return;

    socket.on("updateComment", (data: IComment) => {
      dispatch(
        updateComment({ data: data, token: auth?.access_token as string })
      );
    });

    return () => {
      socket.off("updateComment");
    };
  }, [socket, dispatch]);

  // Delete Comment
  useEffect(() => {
    if (!socket) return;

    socket.on("deleteComment", (data: IComment) => {
      dispatch(
        deleteComment({ data: data, token: auth?.access_token as string })
      );
    });

    return () => {
      socket.off("deleteComment");
    };
  }, [socket, dispatch]);

  return <div></div>;
};

export default SocketClient;
