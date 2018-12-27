const CLIPS = [
  {
    end: 30,
    id: 0,
    name: 'Clip One',
    start: 10
  },
  {
    end: 45,
    id: 1,
    name: 'Clip Two',
    start: 31
  }
];

const VIDEOS = [
  {
    clips: CLIPS,
    id: 0,
    videoUrl: 'http://download.blender.org/durian/trailer/sintel_trailer-480p.mp4'
  }
];

export default {
  Query: {
    clips: () => CLIPS,
    hello(obj: any, { subject }: { subject: string }) {
      return `Hello, ${subject}! from Server`;
    },
    video: (obj: any, { id }: { id: number }): { videoUrl: string } => {
      console.log('RESOLVER ID >>> ', id);
      return VIDEOS[0];
    }
  }
};

/*
To Print in Graphiql

query hello($subject:String) {
  hello(subject: $subject)
}

query Video ($id:ID!) {
  video(id: $id) {
    id
    videoUrl
  }
}

query Clips {
  clips {
    id
    name
    start
    end
  }
}


{
  "id": 0
}
 */
