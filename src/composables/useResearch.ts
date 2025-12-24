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
              },
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
                    },
                  },
                },
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
        sleepHygiene: {
          key: 'sleepHygiene',
          title: 'Sleep Hygiene',
          visible: store.research.rest.sleepHygiene.visible,
          known: store.research.rest.sleepHygiene.known,
          seen: store.research.rest.sleepHygiene.seen,
          complete: store.research.rest.sleepHygiene.complete,
          children: {
            catNapping: {
              key: 'catNapping',
              title: 'Cat Napping',
              visible: store.research.rest.catNapping.visible,
              known: store.research.rest.catNapping.known,
              seen: store.research.rest.catNapping.seen,
              complete: store.research.rest.catNapping.complete,
              children: {
                lucidDreams: {
                  key: 'lucidDreams',
                  title: 'Lucid Dreams',
                  visible: store.research.rest.lucidDreams.visible,
                  known: store.research.rest.lucidDreams.known,
                  seen: store.research.rest.lucidDreams.seen,
                  complete: store.research.rest.lucidDreams.complete,
                  children: {
                    deepRest: {
                      key: 'deepRest',
                      title: 'Deep Rest',
                      visible: store.research.rest.deepRest.visible,
                      known: store.research.rest.deepRest.known,
                      seen: store.research.rest.deepRest.seen,
                      complete: store.research.rest.deepRest.complete,
                    },
                    sheepTechnique: {
                      key: 'sheepTechnique',
                      title: 'Sheep Technique',
                      visible: store.research.rest.sheepTechnique.visible,
                      known: store.research.rest.sheepTechnique.known,
                      seen: store.research.rest.sheepTechnique.seen,
                      complete: store.research.rest.sheepTechnique.complete,
                    },
                  },
                },
              },
            },
          },
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
        smudging: {
          key: 'smudging',
          title: 'Smudging',
          visible: store.research.paranormal.smudging.visible,
          known: store.research.paranormal.smudging.known,
          seen: store.research.paranormal.smudging.seen,
          complete: store.research.paranormal.smudging.complete,
          children: {
            divination: {
              key: 'divination',
              title: 'Divination',
              visible: store.research.paranormal.divination.visible,
              known: store.research.paranormal.divination.known,
              seen: store.research.paranormal.divination.seen,
              complete: store.research.paranormal.divination.complete,
              children: {
                aeromancy: {
                  key: 'aeromancy',
                  title: 'Aeromancy',
                  visible: store.research.paranormal.aeromancy.visible,
                  known: store.research.paranormal.aeromancy.known,
                  seen: store.research.paranormal.aeromancy.seen,
                  complete: store.research.paranormal.aeromancy.complete,
                  children: {
                    cartomancy: {
                      key: 'cartomancy',
                      title: 'Cartomancy',
                      visible: store.research.paranormal.cartomancy.visible,
                      known: store.research.paranormal.cartomancy.known,
                      seen: store.research.paranormal.cartomancy.seen,
                      complete: store.research.paranormal.cartomancy.complete,
                      children: {
                        tasseomancy: {
                          key: 'tasseomancy',
                          title: 'Tasseomancy',
                          visible: store.research.paranormal.tasseomancy.visible,
                          known: store.research.paranormal.tasseomancy.known,
                          seen: store.research.paranormal.tasseomancy.seen,
                          complete: store.research.paranormal.tasseomancy.complete,
                          children: {
                            iconomancy: {
                              key: 'iconomancy',
                              title: 'Iconomancy',
                              visible: store.research.paranormal.iconomancy.visible,
                              known: store.research.paranormal.iconomancy.known,
                              seen: store.research.paranormal.iconomancy.seen,
                              complete: store.research.paranormal.iconomancy.complete,
                            },
                            seance: {
                              key: 'seance',
                              title: 'Séance',
                              visible: store.research.paranormal.seance.visible,
                              known: store.research.paranormal.seance.known,
                              seen: store.research.paranormal.seance.seen,
                              complete: store.research.paranormal.seance.complete,
                            },
                          },
                        },
                        capnomancy: {
                          key: 'capnomancy',
                          title: 'Capnomancy',
                          visible: store.research.paranormal.capnomancy.visible,
                          known: store.research.paranormal.capnomancy.known,
                          seen: store.research.paranormal.capnomancy.seen,
                          complete: store.research.paranormal.capnomancy.complete,
                          children: {
                            pyromancy: {
                              key: 'pyromancy',
                              title: 'Pyromancy',
                              visible: store.research.paranormal.pyromancy.visible,
                              known: store.research.paranormal.pyromancy.known,
                              seen: store.research.paranormal.pyromancy.seen,
                              complete: store.research.paranormal.pyromancy.complete,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            pyromancy: {
              key: 'parapsychology',
              title: 'Para-psychology',
              visible: store.research.paranormal.parapsychology.visible,
              known: store.research.paranormal.parapsychology.known,
              seen: store.research.paranormal.parapsychology.seen,
              complete: store.research.paranormal.parapsychology.complete,
              children: {
                spiritBox: {
                  key: 'spiritBox',
                  title: 'Spirit Box',
                  visible: store.research.paranormal.spiritBox.visible,
                  known: store.research.paranormal.spiritBox.known,
                  seen: store.research.paranormal.spiritBox.seen,
                  complete: store.research.paranormal.spiritBox.complete,
                  children: {
                    scrying: {
                      key: 'scrying',
                      title: 'Scrying',
                      visible: store.research.paranormal.scrying.visible,
                      known: store.research.paranormal.scrying.known,
                      seen: store.research.paranormal.scrying.seen,
                      complete: store.research.paranormal.scrying.complete,
                      children: {
                        spectroscopy: {
                          key: 'spectroscopy',
                          title: 'Spectroscopy',
                          visible: store.research.paranormal.spectroscopy.visible,
                          known: store.research.paranormal.spectroscopy.known,
                          seen: store.research.paranormal.spectroscopy.seen,
                          complete: store.research.paranormal.spectroscopy.complete,
                          children: {
                            astralProjection: {
                              key: 'astralProjection',
                              title: 'Astral Projection',
                              visible: store.research.paranormal.astralProjection.visible,
                              known: store.research.paranormal.astralProjection.known,
                              seen: store.research.paranormal.astralProjection.seen,
                              complete: store.research.paranormal.astralProjection.complete,
                            },
                          },
                        },
                      },
                    },
                    entheogens: {
                      key: 'entheogens',
                      title: 'Entheogens',
                      visible: store.research.paranormal.entheogens.visible,
                      known: store.research.paranormal.entheogens.known,
                      seen: store.research.paranormal.entheogens.seen,
                      complete: store.research.paranormal.entheogens.complete,
                      children: {
                        automaticWriting: {
                          key: 'automaticWriting',
                          title: 'Automatic Writing',
                          visible: store.research.paranormal.automaticWriting.visible,
                          known: store.research.paranormal.automaticWriting.known,
                          seen: store.research.paranormal.automaticWriting.seen,
                          complete: store.research.paranormal.automaticWriting.complete,
                          children: {
                            hermetechnics: {
                              key: 'hermetechnics',
                              title: 'Hermetechnics',
                              visible: store.research.paranormal.hermetechnics.visible,
                              known: store.research.paranormal.hermetechnics.known,
                              seen: store.research.paranormal.hermetechnics.seen,
                              complete: store.research.paranormal.hermetechnics.complete,
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