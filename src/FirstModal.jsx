import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  margin: 0,
};

const FirstModal = ({ setFirstModal }) => {
  const [question, setQuestion] = useState("Введите ваш вопрос здесь");
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstModal(false); // Скрываем модалку в родительском компоненте
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
        >
          Перед прохождением теста нужно ответить на пару простых вопросов для
          проверки вашей скорости реакции
        </Typography>
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLocked}
          >
            Поехали!
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FirstModal;
