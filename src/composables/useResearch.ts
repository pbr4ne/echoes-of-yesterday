import { computed } from 'vue';
import { useStore } from './useStore';

export const useResearch = () => {
  const store = useStore();

  const researchArray = computed(() => [
    {
      title: 'Sustenance',
      key: 'sustenance1',
      parent: 'sustenance',
      colorDark: '#382736',
      colorLight: '#805e7c',
      children: [{ title: 'Cooking for one', key: 'sustenance2', colorDark: '#382736' }]
    },
    {
      title: 'Fitness',
      key: 'fitness1',
      parent: 'fitness',
      colorDark: '#403530',
      colorLight: '#826c62',
      children: [{ title: 'Tae-bo', key: 'fitness2', colorDark: '#403530' }]
    },
    {
      title: 'Recreation',
      key: 'recreation1',
      parent: 'recreation',
      colorDark: '#2a3529',
      colorLight: '#678264',
      children: [{ title: '101 Jokes', key: 'recreation2', colorDark: '#2a3529' }]
    },
    {
      title: 'Rest',
      key: 'rest1',
      parent: 'rest',
      colorDark: '#2b3044',
      colorLight: '#5a648c',
      children: [{ title: 'Meditation', key: 'rest2', colorDark: '#2b3044' }]
    },
    {
      title: 'Paranormal',
      key: 'paranormal1',
      parent: 'paranormal',
      colorDark: '#1c1b24',
      colorLight: '#625e80',
      children: [
        { title: 'Ghost hunting', key: 'paranormal2', colorDark: '#1c1b24' },
        {
          title: 'Spiritualism',
          key: 'paranormal3',
          colorDark: '#1c1b24',
          children: [
            {
              title: 'EMF reading',
              key: 'paranormal4',
              colorDark: '#343237',
              children: [
                { title: 'Orbs', key: 'paranormal5', colorDark: '#343237', children: [{ title: 'Test', key: 'paranormal6', colorDark: '#343237' }] },
                { title: 'EVP', key: 'paranormal7', colorDark: '#343237' }
              ]
            },
            { title: 'Rituals', key: 'paranormal8', colorDark: '#343237' }
          ]
        }
      ]
    }
  ]);

  return { researchArray };
};