import Link from 'next/link';
import { useRouter } from 'next/router';

const article = ({ article }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log('Article ' + id);

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href='/'>Go Back</Link>
    </>
  );
};

// THIS CODE GENERATES PAGES EACH REQUEST
// export const getServerSideProps = async context => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );
//   const article = await res.json();

//   return { props: { article } };
// };

// THIS CODE GENERATES PAGES AT BUILD TIME
export const getStaticProps = async context => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );
  const article = await res.json();

  return { props: { article } };
};
export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const articles = await res.json();
  const paths = articles
    .map(article => article.id)
    .map(id => ({ params: { id: id.toString() } }));

  return { paths, fallback: false };
};

export default article;
