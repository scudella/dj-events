import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import { useRouter } from 'next/router';

const EventPage = ({ evt }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString('en-US')} at{' '}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {evt.attributes.name && (
          <div className={styles.image}>
            <Image
              src={
                evt.attributes.image.data
                  ? evt.attributes.image.data.attributes.formats.medium.url
                  : '/images/event-default.png'
              }
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers :</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description :</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue : {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        <EventMap evt={evt.attributes} />

        <Link href='/events' className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  );
};
export default EventPage;

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const res = await fetch(
    `${API_URL}/api/events/?filters\[slug\][$eq]=${slug}&populate=*`
  );
  const events = await res.json();
  return {
    props: {
      evt: events.data[0],
    },
    revalidate: 1,
  };
};

// export const getServerSideProps = async ({ query: { slug } }) => {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// };
