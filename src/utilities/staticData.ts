import { StaticResearch } from './types';

export const researchArray: StaticResearch[] = [
  {
    title: 'Sustenance',
    key: 'sustenance1',
    parent: 'sustenance',
    color: '#382736',
    children: [{ title: 'Cooking for one', key: 'sustenance2', color: '#382736' }]
  },
  {
    title: 'Fitness',
    key: 'fitness1',
    parent: 'fitness',
    color: '#403530',
    children: [{ title: 'Tae-bo', key: 'fitness2', color: '#403530' }]
  },
  {
    title: 'Recreation',
    key: 'recreation1',
    parent: 'recreation',
    color: '#2a3529',
    children: [{ title: '101 Jokes', key: 'recreation2', color: '#2a3529' }]
  },
  {
    title: 'Rest',
    key: 'rest1',
    parent: 'rest',
    color: '#2b3044',
    children: [{ title: 'Meditation', key: 'rest2', color: '#2b3044' }]
  },
  {
    title: 'Paranormal',
    key: 'paranormal1',
    parent: 'paranormal',
    color: '#1c1b24',
    children: [
      { title: 'Ghost hunting', key: 'paranormal2', color: '#1c1b24' },
      {
        title: 'Spiritualism',
        key: 'paranormal3',
        color: '#1c1b24',
        children: [
          {
            title: 'EMF reading',
            key: 'paranormal4',
            color: '#343237',
            children: [
              { title: 'Orbs', key: 'paranormal5', color: '#343237', children: [{ title: 'Test', key: 'paranormal6', color: '#343237' }] },
              { title: 'EVP', key: 'paranormal7', color: '#343237' }
            ]
          },
          { title: 'Rituals', key: 'paranormal8', color: '#343237' }
        ]
      }
    ]
  }
];