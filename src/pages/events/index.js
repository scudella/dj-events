import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
import { API_URL, PER_PAGE } from '@/config/index';

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt.attributes} />;
      })}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  // Calculate start page
  // +page converts page to a number
  // could use parseInt instead
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/api/events?_start=0&_limit=1`);
  const response = await totalRes.json();
  const total = response.meta.pagination.total;

  // Fetch Events
  const eventRes = await fetch(
    `${API_URL}/api/events?populate=*&_sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
  );
  const events = await eventRes.json();

  return {
    props: { events: events.data, page: +page, total },
  };
};
