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
        herbalism: {
          key: 'herbalism',
          title: 'Herbalism',
          visible: store.research.sustenance.herbalism.visible,
          known: store.research.sustenance.herbalism.known,
          seen: store.research.sustenance.herbalism.seen,
          complete: store.research.sustenance.herbalism.complete,
          children: {
            catFood: {
              key: 'catFood',
              title: 'Gourmet Cat Food',
              visible: store.research.sustenance.catFood.visible,
              known: store.research.sustenance.catFood.known,
              seen: store.research.sustenance.catFood.seen,
              complete: store.research.sustenance.catFood.complete,
              children: {
                fruit: {
                  key: 'fruit',
                  title: 'Miniature Fruit Trees',
                  visible: store.research.sustenance.fruit.visible,
                  known: store.research.sustenance.fruit.known,
                  seen: store.research.sustenance.fruit.seen,
                  complete: store.research.sustenance.fruit.complete,
                  children: {
                    hungerCues: {
                      key: 'hungerCues',
                      title: 'Hunger Cues',
                      visible: store.research.sustenance.hungerCues.visible,
                      known: store.research.sustenance.hungerCues.known,
                      seen: store.research.sustenance.hungerCues.seen,
                      complete: store.research.sustenance.hungerCues.complete,
                    },
                  },
                },
              }
            },
            kitchenEfficiency: {
              key: 'kitchenEfficiency',
              title: 'Kitchen Efficiency',
              visible: store.research.sustenance.kitchenEfficiency.visible,
              known: store.research.sustenance.kitchenEfficiency.known,
              seen: store.research.sustenance.kitchenEfficiency.seen,
              complete: store.research.sustenance.kitchenEfficiency.complete,
              children: {
                grains: {
                  key: 'grains',
                  title: 'Whole Grains',
                  visible: store.research.sustenance.grains.visible,
                  known: store.research.sustenance.grains.known,
                  seen: store.research.sustenance.grains.seen,
                  complete: store.research.sustenance.grains.complete,
                  children: {
                    satiety: {
                      key: 'satiety',
                      title: 'Satiety',
                      visible: store.research.sustenance.satiety.visible,
                      known: store.research.sustenance.satiety.known,
                      seen: store.research.sustenance.satiety.seen,
                      complete: store.research.sustenance.satiety.complete,
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
        calisthenics: {
          key: 'calisthenics',
          title: 'Calisthenics',
          visible: store.research.fitness.calisthenics.visible,
          known: store.research.fitness.calisthenics.known,
          seen: store.research.fitness.calisthenics.seen,
          complete: store.research.fitness.calisthenics.complete,
          children: {
            catnip: {
              key: 'catnip',
              title: 'Growing Catnip',
              visible: store.research.fitness.catnip.visible,
              known: store.research.fitness.catnip.known,
              seen: store.research.fitness.catnip.seen,
              complete: store.research.fitness.catnip.complete,
              children: {
                kinesiology: {
                  key: 'kinesiology',
                  title: 'Kinesiology',
                  visible: store.research.fitness.kinesiology.visible,
                  known: store.research.fitness.kinesiology.known,
                  seen: store.research.fitness.kinesiology.seen,
                  complete: store.research.fitness.kinesiology.complete,
                  children: {                    
                    mobility: {
                      key: 'mobility',
                      title: 'Mobility',
                      visible: store.research.fitness.mobility.visible,
                      known: store.research.fitness.mobility.known,
                      seen: store.research.fitness.mobility.seen,
                      complete: store.research.fitness.mobility.complete,
                    },
                  },
                },
                weights: {
                  key: 'weights',
                  title: 'Weight Training',
                  visible: store.research.fitness.weights.visible,
                  known: store.research.fitness.weights.known,
                  seen: store.research.fitness.weights.seen,
                  complete: store.research.fitness.weights.complete,
                  children: {
                    sprinting: {
                      key: 'sprinting',
                      title: 'Sprinting',
                      visible: store.research.fitness.sprinting.visible,
                      known: store.research.fitness.sprinting.known,
                      seen: store.research.fitness.sprinting.seen,
                      complete: store.research.fitness.sprinting.complete,
                    },
                  },
                },
              },
            },
          },                    
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
        puzzles: {
          key: 'puzzles',
          title: 'Puzzle Solving',
          visible: store.research.recreation.puzzles.visible,
          known: store.research.recreation.puzzles.known,
          seen: store.research.recreation.puzzles.seen,
          complete: store.research.recreation.puzzles.complete,
          children: {
            fun: {
              key: 'fun',
              title: 'How to Have Fun',
              visible: store.research.recreation.fun.visible,
              known: store.research.recreation.fun.known,
              seen: store.research.recreation.fun.seen,
              complete: store.research.recreation.fun.complete,
            },
          },
        },
        catTricks: {
          key: 'catTricks',
          title: 'Cat Tricks',
          visible: store.research.recreation.catTricks.visible,
          known: store.research.recreation.catTricks.known,
          seen: store.research.recreation.catTricks.seen,
          complete: store.research.recreation.catTricks.complete,
          children: {
            entertainmentTBD: {
              key: 'entertainmentTBD',
              title: 'Entertainment TBD',
              visible: store.research.recreation.entertainmentTBD.visible,
              known: store.research.recreation.entertainmentTBD.known,
              seen: store.research.recreation.entertainmentTBD.seen,
              complete: store.research.recreation.entertainmentTBD.complete,
              children: {
                lateralThinking: {
                  key: 'lateralThinking',
                  title: 'Lateral Thinking',
                  visible: store.research.recreation.lateralThinking.visible,
                  known: store.research.recreation.lateralThinking.known,
                  seen: store.research.recreation.lateralThinking.seen,
                  complete: store.research.recreation.lateralThinking.complete,
                  children: {
                    daydreaming: {
                      key: 'daydreaming',
                      title: 'Daydreaming',
                      visible: store.research.recreation.daydreaming.visible,
                      known: store.research.recreation.daydreaming.known,
                      seen: store.research.recreation.daydreaming.seen,
                      complete: store.research.recreation.daydreaming.complete,
                    }
                  },
                }
              },
            },
          },
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