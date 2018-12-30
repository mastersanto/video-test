// TODO: add Subscriptions
// import { PubSub } from 'apollo-server';
import defaults from './defaults';

const { clips, videos } = defaults;

// const SAVE_CLIP = 'SAVE_CLIP';
// const DELETE_CLIP = 'DELETE_CLIP';

// const pubsub = new PubSub();

export default {
  Query: {
    // @ts-ignore
    clip: (_, { clipId }) => {
      console.log('Query clip >>> ', clipId);
      return clips.find(clip => clip.id === clipId);
    },
    clips: () => clips,
    hello(obj: any, { subject }: { subject: string }) {
      return `Hello, ${subject}! from Server`;
    },
    video: (obj: any, { id }: { id: number }): { videoUrl: string } => {
      console.log('RESOLVER ID >>> ', id);
      return videos[0];
    }
  },

  Mutation: {
    // @ts-ignore
    // tslint:disable-next-line
    async saveClip(_, { clipId, name, start, end }) {
      let clipToSave;
      console.log('>>> saveClip > ', clipId);

      if (clipId) {
        clipToSave = await clips.find(clip => clip.id === clipId);

        if (clipToSave) {
          clipToSave.name = name;
          clipToSave.start = start;
          clipToSave.end = end;
        }
      } else {
        clipToSave = {
          end,
          id: clips.length + 1,
          name,
          start
        };
      }

      console.log('>>> clipToSave > ', clipToSave);
      return clipToSave;
    },
    // @ts-ignore
    // tslint:disable-next-line
    async deleteClip(_, { clipId }) {
      const clipToDelete = await clips.find(clip => clip.id === clipId);
      // @ts-ignore
      // return clipToDelete.destroy();
      return _.destroy(clips, clipToDelete);
    }
    /*
    deleteClip: (_, { clipId }) => {
      console.log('>>> deleteClip > ', clipId);
      const clipToDelete = clips.find(clip => clip.id === clipId);
      _.remove(clips, clipToDelete);
      // const { [id]: clip, ...otherClips } = clips;
      console.log('>>> deleteClip 2 > ', clipId);
      pubsub.publish(DELETE_CLIP, { id: clipId });
      return clipToDelete;
    }
    */
    /*
    deleteCompany: (root, { id }) => {
      let deleteCo = Company.find(c => c.id == id);
      _.remove(Company, deleteCo);
      pubsub.publish(DELETE_COMPANY, { companyDeleted: deleteCo });
      return deleteCo;
    }
    */
  }
};

/*

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

query Clip ($id:Int!) {
  clip(clipId: $id) {
    id
    name
    start
    end
  }
}

mutation DeleteClip($id:Int!) {
  deleteClip(clipId:$id)
}

mutation SaveClip($id:Int!, $name: String, $start: Int, $end: Int) {
  saveClip(clipId:$id, name:$name, start:$start, end:$end) {
    id, name, start, end
  }
}


// TO QUERY VARS
{
  "id": 1,
  "name": "Test Save",
  "start": 15,
  "end": 20
}

{
  "id": 0
}

{
  "clipId": 1
}

 */
