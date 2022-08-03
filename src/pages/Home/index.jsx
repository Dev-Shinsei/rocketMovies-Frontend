import { Container, ButtonAdd, Profile, Logout, Avatar } from "./styles";
import { Input } from "../../components/Input";
import { FiPlus } from "react-icons/fi";
import { MovieCard } from "../../components/MovieCard";
import avatar from "../../assets/avatar.png";

export function Home() {
  return (
    <Container>
      <header>
        <h2>RocketMovies</h2>
        <Input
          type="text"
          placeholder="Pesquisar pelo título"
        />
        <Profile>
          <div>
            <strong>Carlos Gomes</strong>
            <Logout>sair</Logout>
          </div>
          <Avatar to="/profile">
            <img src={avatar} alt="Foto de Carlos" />
          </Avatar>
        </Profile>
      </header>

      <section>
        <div>
          <h1>Meus filmes</h1>
          <ButtonAdd to="/new">
            <FiPlus />
            Adicionar filme
          </ButtonAdd>
        </div>

        <main>
          <MovieCard />
        </main>
      </section>
    </Container>
  );
}
