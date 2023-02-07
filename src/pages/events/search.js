import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import qs from 'qs';

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title='Search Results'>
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term} </h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt.attributes} />;
      })}
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { term } }) => {
  const query = qs.stringify({
    sort: ['date:ASC'],
    filters: {
      $or: [
        {
          name: {
            $containsi: term,
          },
        },
        {
          performers: {
            $containsi: term,
          },
        },
        {
          description: {
            $containsi: term,
          },
        },
        {
          venue: {
            $containsi: term,
          },
        },
      ],
    },
    populate: '*',
  });
  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();

  return {
    props: { events: events.data },
  };
};
