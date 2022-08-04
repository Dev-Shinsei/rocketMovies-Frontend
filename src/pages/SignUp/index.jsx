import { api } from "../../services/api";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form, Background } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos");
    }
    setLoading(true);

    api
      .post("users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
          setLoading(false);
        } else {
          alert("Não foi possível cadastrar");
          setLoading(false);
        }
      });
  }

  return (
    <Container>
      <Form>
        <h1>RocketMovies</h1>
        <p>Aplicação para acompanhar tudo que assistir.</p>
        <h2>Crie sua conta</h2>

        <Input
          icon={FiUser}
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          icon={FiMail}
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          icon={FiLock}
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          disabled={loading}
          title={loading ? "Cadastrando..." : "Cadastrar"}
          onClick={handleSignUp}
        />

        <Link to="/">Voltar para o login</Link>
      </Form>
      <Background />
    </Container>
  );
}
