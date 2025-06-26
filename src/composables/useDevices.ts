export const useDevices = () => {

  const devices = { 
    poltergeist: {
      deviceCommunication: {
        teaLeaves: [
          ['The leaves swirl. Poltergeist.', 'Step 2'],
          ['The leaves scatter. Poltergeist.'],
        ],
        tv: [
          ['The screen flickers. Poltergeist.', 'Step 2'],
          ['The screen has static. Poltergeist.'],
        ]
      }
    },
    orb: {
      deviceCommunication: {
        teaLeaves: [
          ['The leaves swirl. Orb.', 'Step 2'],
          ['The leaves scatter. Orb.'],
        ],
        tv: [
          ['The screen flickers. Orb.', 'Step 2'],
          ['The screen has static. Orb.'],
        ]
      }
    },
    wraith: {
      deviceCommunication: {
        teaLeaves: [
          ['The leaves swirl. Wraith.', 'Step 2'],
          ['The leaves scatter. Wraith.'],
        ],
        tv: [
          ['The screen flickers. Wraith.', 'Step 2'],
          ['The screen has static. Wraith.'],
        ]
      }
    },
    spirit: {
      deviceCommunication: {
        teaLeaves: [
          ['The leaves swirl. Spirit.', 'Step 2'],
          ['The leaves scatter. Spirit.'],
        ],
        tv: [
          ['The screen flickers. Spirit.', 'Step 2'],
          ['The screen has static. Spirit.'],
        ]
      }
    },
    phantom: {
      deviceCommunication: {
        teaLeaves: [
          ['The leaves swirl. Phantom.', 'Step 2'],
          ['The leaves scatter. Phantom.'],
        ],
        tv: [
          ['The screen flickers. Phantom.', 'Step 2'],
          ['The screen has static. Phantom.'],
        ]
      }
    }
  };

  return { devices };
}
