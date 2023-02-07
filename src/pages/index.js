import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt.attributes} />;
      })}
      {events.length > 0 && (
        <Link href='/events' className='btn-secondary'>
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `${API_URL}/api/events?populate=*&_sort=date:ASC&pagination[limit]=2`
  );
  const events = await res.json();

  return {
    props: { events: events.data },
    revalidate: 1,
  };
};
