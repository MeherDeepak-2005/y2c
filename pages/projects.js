import React from 'react';

function projects() {
  return <div></div>;
}

export default projects;


export async function getServerSideProps() {
  const projects = []

  const resProjects = await getDocs(collection(db, 'projects'))
  
  console.log(resProjects)
}
