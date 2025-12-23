import { computed, markRaw } from 'vue';
import { useStore } from './useStore';
import { Research, ResearchKeys } from '../utilities/types';
import { 
  BookTheta24Regular as SustenanceIcon,
  BookPulse24Regular as FitnessIcon,
  BookStar24Regular as EntertainmentIcon,
  BookClock24Regular as RestIcon,
  BookCompass24Regular as ParanormalIcon,
} from '@vicons/fluent';

export const useResearch = () => {
  const store = useStore();

  const research = computed(() => ({
    sustenance: {
      key: 'sustenance',
      title: 'Sustenance',
      colorDark: '#382736',
      colorLight: '#805e7c',
      icon: markRaw(SustenanceIcon),
      children: { 
        sustenance1: {
          key: 'sustenance1',
          title: 'Herbalism',
          visible: store.research.sustenance.sustenance1.visible,
          known: store.research.sustenance.sustenance1.known,
          seen: store.research.sustenance.sustenance1.seen,
          complete: store.research.sustenance.sustenance1.complete,
          children: {
            sustenance2: {
              key: 'sustenance2',
              title: 'Gourmet Cat Food',
              visible: store.research.sustenance.sustenance2.visible,
              known: store.research.sustenance.sustenance2.known,
              seen: store.research.sustenance.sustenance2.seen,
              complete: store.research.sustenance.sustenance2.complete,
              children: {
                sustenance3: {
                  key: 'sustenance3',
                  title: 'Miniature Fruit Trees',
                  visible: store.research.sustenance.sustenance3.visible,
                  known: store.research.sustenance.sustenance3.known,
                  seen: store.research.sustenance.sustenance3.seen,
                  complete: store.research.sustenance.sustenance3.complete,
                  children: {
                    sustenance4: {
                      key: 'sustenance4',
                      title: 'Hunger Cues',
                      visible: store.research.sustenance.sustenance4.visible,
                      known: store.research.sustenance.sustenance4.known,
                      seen: store.research.sustenance.sustenance4.seen,
                      complete: store.research.sustenance.sustenance4.complete,
                    },
                  },
                },
              }
            },
            sustenance5: {
              key: 'sustenance5',
              title: 'Kitchen Efficiency',
              visible: store.research.sustenance.sustenance5.visible,
              known: store.research.sustenance.sustenance5.known,
              seen: store.research.sustenance.sustenance5.seen,
              complete: store.research.sustenance.sustenance5.complete,
              children: {
                sustenance6: {
                  key: 'sustenance6',
                  title: 'Whole Grains',
                  visible: store.research.sustenance.sustenance6.visible,
                  known: store.research.sustenance.sustenance6.known,
                  seen: store.research.sustenance.sustenance6.seen,
                  complete: store.research.sustenance.sustenance6.complete,
                  children: {
                    sustenance7: {
                      key: 'sustenance7',
                      title: 'Satiety',
                      visible: store.research.sustenance.sustenance7.visible,
                      known: store.research.sustenance.sustenance7.known,
                      seen: store.research.sustenance.sustenance7.seen,
                      complete: store.research.sustenance.sustenance7.complete,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    fitness: {
      key: 'fitness',
      title: 'Fitness',
      colorDark: '#403530',
      colorLight: '#826c62',
      icon: markRaw(FitnessIcon),
      children: {
        fitness1: {
          key: 'fitness1',
          title: 'Fitness 1',
          visible: store.research.fitness.fitness1.visible,
          known: store.research.fitness.fitness1.known,
          seen: store.research.fitness.fitness1.seen,
          complete: store.research.fitness.fitness1.complete,
          children: {
            fitness2: {
              key: 'fitness2',
              title: 'Fitness 2',
              visible: store.research.fitness.fitness2.visible,
              known: store.research.fitness.fitness2.known,
              seen: store.research.fitness.fitness2.seen,
              complete: store.research.fitness.fitness2.complete,
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
      icon: markRaw(EntertainmentIcon),
      children: {
        recreation1: {
          key: 'recreation1',
          title: 'Recreation 1',
          visible: store.research.recreation.recreation1.visible,
          known: store.research.recreation.recreation1.known,
          seen: store.research.recreation.recreation1.seen,
          complete: store.research.recreation.recreation1.complete,
          children: {
            recreation2: {
              key: 'recreation2',
              title: 'Recreation 2',
              visible: store.research.recreation.recreation2.visible,
              known: store.research.recreation.recreation2.known,
              seen: store.research.recreation.recreation2.seen,
              complete: store.research.recreation.recreation2.complete,
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
      icon: markRaw(RestIcon),
      children: {
        rest1: {
          key: 'rest1',
          title: 'Rest 1',
          visible: store.research.rest.rest1.visible,
          known: store.research.rest.rest1.known,
          seen: store.research.rest.rest1.seen,
          complete: store.research.rest.rest1.complete,
          children: {
            rest2: {
              key: 'rest2',
              title: 'Rest 2',
              visible: store.research.rest.rest2.visible,
              known: store.research.rest.rest2.known,
              seen: store.research.rest.rest2.seen,
              complete: store.research.rest.rest2.complete,
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
      icon: markRaw(ParanormalIcon),
      children: {
        paranormal1: {
          key: 'paranormal1',
          title: 'Smudging',
          visible: store.research.paranormal.paranormal1.visible,
          known: store.research.paranormal.paranormal1.known,
          seen: store.research.paranormal.paranormal1.seen,
          complete: store.research.paranormal.paranormal1.complete,
          children: {
            paranormal2: {
              key: 'paranormal2',
              title: 'Divination',
              visible: store.research.paranormal.paranormal2.visible,
              known: store.research.paranormal.paranormal2.known,
              seen: store.research.paranormal.paranormal2.seen,
              complete: store.research.paranormal.paranormal2.complete,
              children: {
                paranormal3: {
                  key: 'paranormal3',
                  title: 'Aeromancy',
                  visible: store.research.paranormal.paranormal3.visible,
                  known: store.research.paranormal.paranormal3.known,
                  seen: store.research.paranormal.paranormal3.seen,
                  complete: store.research.paranormal.paranormal3.complete,
                  children: {
                    paranormal4: {
                      key: 'paranormal4',
                      title: 'Cartomancy',
                      visible: store.research.paranormal.paranormal4.visible,
                      known: store.research.paranormal.paranormal4.known,
                      seen: store.research.paranormal.paranormal4.seen,
                      complete: store.research.paranormal.paranormal4.complete,
                      children: {
                        paranormal5: {
                          key: 'paranormal5',
                          title: 'Tasseomancy',
                          visible: store.research.paranormal.paranormal5.visible,
                          known: store.research.paranormal.paranormal5.known,
                          seen: store.research.paranormal.paranormal5.seen,
                          complete: store.research.paranormal.paranormal5.complete,
                          children: {
                            paranormal6: {
                              key: 'paranormal6',
                              title: 'Iconomancy',
                              visible: store.research.paranormal.paranormal6.visible,
                              known: store.research.paranormal.paranormal6.known,
                              seen: store.research.paranormal.paranormal6.seen,
                              complete: store.research.paranormal.paranormal6.complete,
                            },
                            paranormal7: {
                              key: 'paranormal7',
                              title: 'Séance',
                              visible: store.research.paranormal.paranormal7.visible,
                              known: store.research.paranormal.paranormal7.known,
                              seen: store.research.paranormal.paranormal7.seen,
                              complete: store.research.paranormal.paranormal7.complete,
                            },
                          },
                        },
                        paranormal8: {
                          key: 'paranormal8',
                          title: 'Capnomancy',
                          visible: store.research.paranormal.paranormal8.visible,
                          known: store.research.paranormal.paranormal8.known,
                          seen: store.research.paranormal.paranormal8.seen,
                          complete: store.research.paranormal.paranormal8.complete,
                          children: {
                            paranormal9: {
                              key: 'paranormal9',
                              title: 'Pyromancy',
                              visible: store.research.paranormal.paranormal9.visible,
                              known: store.research.paranormal.paranormal9.known,
                              seen: store.research.paranormal.paranormal9.seen,
                              complete: store.research.paranormal.paranormal9.complete,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            paranormal9: {
              key: 'paranormal10',
              title: 'Para-psychology',
              visible: store.research.paranormal.paranormal10.visible,
              known: store.research.paranormal.paranormal10.known,
              seen: store.research.paranormal.paranormal10.seen,
              complete: store.research.paranormal.paranormal10.complete,
              children: {
                paranormal11: {
                  key: 'paranormal11',
                  title: 'Spirit Box',
                  visible: store.research.paranormal.paranormal11.visible,
                  known: store.research.paranormal.paranormal11.known,
                  seen: store.research.paranormal.paranormal11.seen,
                  complete: store.research.paranormal.paranormal11.complete,
                  children: {
                    paranormal12: {
                      key: 'paranormal12',
                      title: 'Scrying',
                      visible: store.research.paranormal.paranormal12.visible,
                      known: store.research.paranormal.paranormal12.known,
                      seen: store.research.paranormal.paranormal12.seen,
                      complete: store.research.paranormal.paranormal12.complete,
                      children: {
                        paranormal13: {
                          key: 'paranormal13',
                          title: 'Spectroscopy',
                          visible: store.research.paranormal.paranormal13.visible,
                          known: store.research.paranormal.paranormal13.known,
                          seen: store.research.paranormal.paranormal13.seen,
                          complete: store.research.paranormal.paranormal13.complete,
                          children: {
                            paranormal14: {
                              key: 'paranormal14',
                              title: 'Astral Projection',
                              visible: store.research.paranormal.paranormal14.visible,
                              known: store.research.paranormal.paranormal14.known,
                              seen: store.research.paranormal.paranormal14.seen,
                              complete: store.research.paranormal.paranormal14.complete,
                            },
                          },
                        },
                      },
                    },
                    paranormal15: {
                      key: 'paranormal15',
                      title: 'Entheogens',
                      visible: store.research.paranormal.paranormal15.visible,
                      known: store.research.paranormal.paranormal15.known,
                      seen: store.research.paranormal.paranormal15.seen,
                      complete: store.research.paranormal.paranormal15.complete,
                      children: {
                        paranormal16: {
                          key: 'paranormal16',
                          title: 'Automatic Writing',
                          visible: store.research.paranormal.paranormal16.visible,
                          known: store.research.paranormal.paranormal16.known,
                          seen: store.research.paranormal.paranormal16.seen,
                          complete: store.research.paranormal.paranormal16.complete,
                          children: {
                            paranormal17: {
                              key: 'paranormal17',
                              title: 'Hermetechnics',
                              visible: store.research.paranormal.paranormal17.visible,
                              known: store.research.paranormal.paranormal17.known,
                              seen: store.research.paranormal.paranormal17.seen,
                              complete: store.research.paranormal.paranormal17.complete,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }));

  const findTopLevelResearchNode = (childKey: string): any | null => {
    for (const researchKey in research.value) {
      const topLevelResearch = research.value[researchKey as ResearchKeys];
      
      if (containsChildKey(topLevelResearch, childKey)) {
        return topLevelResearch;
      }
    }  
    return null;
  };
  
  const containsChildKey = (researchNode: any, childKey: string): boolean => {
    if (researchNode.key === childKey) {
      return true;
    }
  
    if (researchNode.children) {
      for (const child in researchNode.children) {
        if (containsChildKey(researchNode.children[child], childKey)) {
          return true;
        }
      }
    }  
    return false;
  };

  return { findTopLevelResearchNode, research };
};