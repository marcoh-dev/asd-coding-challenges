import { useRouter } from "next/router";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";

export default function Character() {
  const router = useRouter();
  console.log(router);
  //const id = 1;
  const { id } = router?.query;
  const {
    data: character,
    error,
    isLoading,
  } = useSWR(`https://swapi.py4e.com/api/people/${id}`);

  if (error) {
    console.dir("error", typeof error, error);
    console.dir("error.name", typeof error.name, error.name);
    console.dir("error.message", typeof error.message, error.message);
    console.dir("error.info", typeof error.info, error.info);
    console.dir("error.status", typeof error.status, error.status);
    console.error("ERROR!", error.info);
    return <div>failed to load</div>;
  }
  if (isLoading || !character) return <div>loading...</div>;

  //console.log(character);
  const { name, height, eye_color, birth_year } = character;

  return (
    <Layout>
      <Card
        id={id}
        name={name}
        height={height}
        eyeColor={eye_color}
        birthYear={birth_year}
      />
    </Layout>
  );
}
