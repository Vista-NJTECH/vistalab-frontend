import FaceLogin from "./FaceLogin";
import CredentialsLogin from "./CredentialsLogin";

export default function Page({ searchParams }) {
  const isFaceLogin = searchParams.isFaceLogin && JSON.parse(searchParams.isFaceLogin.toLowerCase());

  if (isFaceLogin) return <FaceLogin />;
  else return <CredentialsLogin />;
}
