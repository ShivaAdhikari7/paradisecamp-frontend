import React from 'react';
import FeatureCard from './FeatureCard';

import AddIcon from '../icons/AddIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import ExploreIcon from '../icons/ExploreIcon';
import BlogIcon from '../icons/BlogIcon';

const FeatureSection = () => {
  const featureContent = [
    {
      title: 'Add Spot',
      description:
        'You can add the spot for picnic and camping on your area or locality to promote the local business. This helps to promote the area as well as helps people to explore more places.',
      icon: <AddIcon />,
    },
    {
      title: 'Book Spot',
      description:
        'You can book the spot for picnicking and camping by going through various places and finding the one which is best for your choice. Among hundreds of spots, you are able to choose the destination you prefer.',
      icon: <BookmarkIcon />,
    },
    {
      title: 'Explore Spot',
      description:
        'You can add choose spot for your picnic or camping event from among hundred of spots posted by other users.You can then contact the spot handlers and book the spot you want for your event.',
      icon: <ExploreIcon />,
    },
    {
      title: 'Write Blogs',
      description:
        'After visiting some place fun and doing some fun adventure, you might want to share some fun memories among people or for your future self. So, our platform fulfills that as you can also write blog in our site.',
      icon: <BlogIcon />,
    },
  ];

  return (
    <div className="container py-5">
      <div className="grid grid--4-cols">
        {featureContent.map((content, i) => {
          return (
            <FeatureCard
              key={i}
              icon={content.icon}
              title={content.title}
              description={content.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
