import React, { lazy, Suspense } from 'react';

const Profile = lazy(() => import('profile/Profile').catch((ex) => {

  return { default: () => <div className='error'>Component is not available!</div> };

}));

const Places = lazy(() => import('places/Places').catch((ex) => {

  return { default: () => <div className='error'>Component is not available!</div> };

}));

const AddPlace = lazy(() => import('places/AddPlace').catch((ex) => {

  return { default: () => <div className='error'>Component is not available!</div> };

}));

function Content() {

  return (
    <main className="content">
      <section className="profile page__section">
        <Suspense>
          <Profile />
        </Suspense>
        <Suspense>
          <AddPlace />
        </Suspense>
      </section>
      <section className="places page__section">
        <Suspense>
          <Places />
        </Suspense>
      </section>
    </main>
  );
}

export default Content;
