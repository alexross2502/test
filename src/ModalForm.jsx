import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

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

const ModalForm = () => {
  const [question, setQuestion] = useState("Введите ваш вопрос здесь");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [buttonText, setButtonText] = useState("Отправить ответ");

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (["нет", "нит", "no", "-", "не"].includes(answer.toLowerCase().trim())) {
      setError("Врать плохо!");
      return;
    }

    if (
      ![
        "да",
        "ага",
        "точно",
        "разумеется",
        "естественно",
        "конечно",
        "да-да",
        "подтверждаю",
        "yes",
        "y",
        "yeah",
        "yep",
        "yup",
        "sure",
        "of course",
        "absolutely",
        "indeed",
        "right",
        "correct",
        "+",
        "ofc",
      ].includes(answer.toLowerCase().trim())
    ) {
      setError("?????");
      return;
    } else {
      setQuestion("сосал?)))))");
      setIsLocked(true);
      setButtonText("Ответ принят!");
    }

    setError("");
  };

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
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
            overflow: "hidden",
            opacity: 0, // Скрываем до момента анимации
            transition: "transform 0.5s ease, opacity 0.5s ease", // Плавная анимация
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            {question}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Введите ответ"
              margin="normal"
              value={answer}
              onChange={handleAnswerChange}
              error={!!error}
              helperText={error}
              required
              autoComplete="off"
              InputProps={{
                readOnly: isLocked, // Поле доступно только для чтения
                style: isLocked ? { pointerEvents: "none" } : {}, // Отключение кликов
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLocked}
            >
              {buttonText}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalForm;
