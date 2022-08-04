import { useState, useEffect, createContext, useContext } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  async function singIn({ email, password }) {
    try {
      setLoading(true);
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@rocketmovies:user", JSON.stringify(user));
      localStorage.setItem("@rocketmovies:token", token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        setLoading(false);
      } else {
        alert("Não foi possível entrar");
        setLoading(false);
      }
    }
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }
      await api.put("/users", user);

      localSotrage.setItem("@rocketmovies:user", JSON.stringfy(user));
      setData({ user, token: data.token });
      alert("Perfil Atualizado.");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        setLoading(false);
      } else {
        alert("Não foi possível atualizar o perfil.");
        setLoading(false);
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketmovies:user");
    localStorage.removeItem("@rocketmovies:token");

    setData({});
    setLoading(false);
  }

  useEffect(() => {
    const user = localStorage.getItem("@rocketmovies:user");
    const token = localStorage.getItem("@rocketmovies:token");

    if (token && user) {
      api.defaults.headers.authorization = "Bearer " + token;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singIn,
        loading,
        setLoading,
        signOut,
        updateProfile,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
