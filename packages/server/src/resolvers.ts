// TODO: add Subscriptions
import { PubSub } from 'apollo-server';
import defaults from './defaults';

const { clips, videos } = defaults;

const SAVE_CLIP = 'SAVE_CLIP';
// const DELETE_CLIP = 'DELETE_CLIP';

const pubsub = new PubSub();

// TODO: move to utils
const getId = (): string => {
  /*jshint bitwise:false */
  let i;
  let random;
  let uuid = '';

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
      .toString(16);
  }

  return uuid;
};

export default {
  Query: {
    // @ts-ignore
    clip: (_, { id }) => {
      console.log('Query clip >>> ', id);
      return clips.find(clip => clip.id === id);
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
    async saveClip(_, { id, name, start, end }, { cache }) {
      console.log('>>> deleteClip > cache > ', cache);
      let clipToSave;

      if (id != null) {
        clipToSave = await clips.find(clipItem => clipItem.id === id);
        if (clipToSave) {
          console.log('>>> save With id > clipToSave > ', id);
          console.log('>>> save With > ', clipToSave);
          clipToSave.name = name;
          clipToSave.start = start;
          clipToSave.end = end;
        }
      } else {
        console.log('>>> clipToSave NO id > clips.length > ', clips.length);
        clipToSave = {
          end,
          id: getId(),
          name,
          start
        };
        console.log('>>> clipToSave NO id > > ', clipToSave);
        clips.push(clipToSave);
      }
      pubsub.publish(SAVE_CLIP, { clip: clipToSave });

      return clipToSave;
    },
    // async deleteClip(_, { id }, { cache }) {
    // @ts-ignore
    // tslint:disable-next-line
    async deleteClip(_, { id }, { cache }) {
      // console.log('>>> deleteClip > cache > ', cache);
      // console.log('>>> deleteClip > cache writeData!', cache.writeData());
      const clipToDelete = await clips.find(clip => clip.id === id);
      // @ts-ignore
      const index = clips.indexOf(clipToDelete);
      console.log('>>> deleteClip > index >', index);
      // console.log('>>> clipToDelete ', clipToDelete);
      clips.splice(index, 1);
      return true;
    }
    /*
    deleteClip: (_, { id }) => {
      console.log('>>> deleteClip > ', id);
      const clipToDelete = clips.find(clip => clip.id === id);
      _.remove(clips, clipToDelete);
      // const { [id]: clip, ...otherClips } = clips;
      console.log('>>> deleteClip 2 > ', id);
      pubsub.publish(DELETE_CLIP, { id: id });
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
  clip(id: $id) {
    id
    name
    start
    end
  }
}

mutation DeleteClip($id:Int!) {
  deleteClip(id:$id)
}

mutation SaveClip($id:Int!, $name: String, $start: Int, $end: Int) {
  saveClip(id:$id, name:$name, start:$start, end:$end) {
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
  "id": 1
}

 */
