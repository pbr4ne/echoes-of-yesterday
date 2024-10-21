import { computed } from 'vue';
import { useStore } from './useStore';

export const useResearch = () => {
  const store = useStore();

  const research = computed(() => ({
    sustenance: {
      key: 'sustenance',
      title: 'Sustenance',
      colorDark: '#382736',
      colorLight: '#805e7c',
      children: { 
        sustenance1: {
          key: 'sustenance1',
          title: 'Sustenance 1',
          visible: store.research2.sustenance.sustenance1.visible,
          known: store.research2.sustenance.sustenance1.known,
          complete: store.research2.sustenance.sustenance1.complete,
          children: {
            sustenance2: {
              key: 'sustenance2',
              title: 'Sustenance 2',
              visible: store.research2.sustenance.sustenance2.visible,
              known: store.research2.sustenance.sustenance2.known,
              complete: store.research2.sustenance.sustenance2.complete,
            },
          }
        },
      },
    },
    fitness: {
      key: 'fitness',
      title: 'Fitness',
      colorDark: '#403530',
      colorLight: '#826c62',
      children: {
        fitness1: {
          key: 'fitness1',
          title: 'Fitness 1',
          visible: store.research2.fitness.fitness1.visible,
          known: store.research2.fitness.fitness1.known,
          complete: store.research2.fitness.fitness1.complete,
          children: {
            fitness2: {
              key: 'fitness2',
              title: 'Fitness 2',
              visible: store.research2.fitness.fitness2.visible,
              known: store.research2.fitness.fitness2.known,
              complete: store.research2.fitness.fitness2.complete,
            },
          }
        },
      },
    },
    recreation: {
      key: 'recreation',
      title: 'Recreation',
      colorDark: '#2a3529',
      colorLight: '#678264',
      children: {
        recreation1: {
          key: 'recreation1',
          title: 'Recreation 1',
          visible: store.research2.recreation.recreation1.visible,
          known: store.research2.recreation.recreation1.known,
          complete: store.research2.recreation.recreation1.complete,
          children: {
            recreation2: {
              key: 'recreation2',
              title: 'Recreation 2',
              visible: store.research2.recreation.recreation2.visible,
              known: store.research2.recreation.recreation2.known,
              complete: store.research2.recreation.recreation2.complete,
            },
          }
        },
      },
    },
    rest: {
      key: 'rest',
      title: 'Rest',
      colorDark: '#2b3044',
      colorLight: '#5a648c',
      children: {
        rest1: {
          key: 'rest1',
          title: 'Rest 1',
          visible: store.research2.rest.rest1.visible,
          known: store.research2.rest.rest1.known,
          complete: store.research2.rest.rest1.complete,
          children: {
            rest2: {
              key: 'rest2',
              title: 'Rest 2',
              visible: store.research2.rest.rest2.visible,
              known: store.research2.rest.rest2.known,
              complete: store.research2.rest.rest2.complete,
            },
          }
        },
      },
    },
    paranormal: {
      key: 'paranormal',
      title: 'Paranormal',
      colorDark: '#1c1b24',
      colorLight: '#625e80',
      children: {
        paranormal1: {
          key: 'paranormal1',
          title: 'Paranormal 1',
          visible: store.research2.paranormal.paranormal1.visible,
          known: store.research2.paranormal.paranormal1.known,
          complete: store.research2.paranormal.paranormal1.complete,
          children: {
            paranormal2: {
              key: 'paranormal2',
              title: 'Paranormal 2',
              visible: store.research2.paranormal.paranormal2.visible,
              known: store.research2.paranormal.paranormal2.known,
              complete: store.research2.paranormal.paranormal2.complete,
            },
            paranormal3: {
              key: 'paranormal3',
              title: 'Paranormal 3',
              visible: store.research2.paranormal.paranormal3.visible,
              known: store.research2.paranormal.paranormal3.known,
              complete: store.research2.paranormal.paranormal3.complete,
              children: {
                paranormal4: {
                  key: 'paranormal4',
                  title: 'Paranormal 4',
                  visible: store.research2.paranormal.paranormal4.visible,
                  known: store.research2.paranormal.paranormal4.known,
                  complete: store.research2.paranormal.paranormal4.complete,
                  children: {
                    paranormal5: {
                      key: 'paranormal5',
                      title: 'Paranormal 5',
                      visible: store.research2.paranormal.paranormal5.visible,
                      known: store.research2.paranormal.paranormal5.known,
                      complete: store.research2.paranormal.paranormal5.complete,
                      children: {
                        paranormal6: {
                          key: 'paranormal6',
                          title: 'Paranormal 6',
                          visible: store.research2.paranormal.paranormal6.visible,
                          known: store.research2.paranormal.paranormal6.known,
                          complete: store.research2.paranormal.paranormal6.complete,
                        },
                      }
                    },
                    paranormal7: {
                      key: 'paranormal7',
                      title: 'Paranormal 7',
                      visible: store.research2.paranormal.paranormal7.visible,
                      known: store.research2.paranormal.paranormal7.known,
                      complete: store.research2.paranormal.paranormal7.complete,
                    },
                  }
                },
                paranormal8: {
                  key: 'paranormal8',
                  title: 'Paranormal 8',
                  visible: store.research2.paranormal.paranormal8.visible,
                  known: store.research2.paranormal.paranormal8.known,
                  complete: store.research2.paranormal.paranormal8.complete,
                },
              }
            },
          }
        },
      },
    },
  }));

  return { research };
};