// TODO: add Subscriptions
import { PubSub } from 'apollo-server';
import defaults from './defaults';

const { clips, videos } = defaults;

const SAVE_CLIP = 'SAVE_CLIP';
// const DELETE_CLIP = 'DELETE_CLIP';

const pubsub = new PubSub();

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
    async saveClip(_, { id, name, start, end }) {
      // async saveClip(_, { clip }) {
      let clipToSave;
      // const { id, name, start, end } = clip;
      // console.log('>>> saveClip > ', id);
      /*
      clipToSave = {
        end,
        id: clips.length + 1,
        name,
        start
      };
      */
      // clips.push(clipToSave);

      if (id != null) {
        clipToSave = await clips.find(clipItem => clipItem.id === id);
        if (clipToSave) {
          console.log('>>> save With id > clipToSave > ', id);
          console.log('>>> save With > ', clipToSave);
          clipToSave.name = name;
          clipToSave.start = start;
          clipToSave.end = end;
          // clips.push(clipToSave);
        }
      } else {
        console.log('>>> clipToSave NO id > clips.length > ', clips.length);
        clipToSave = {
          end,
          // TODO: implement uuid and ID instead of Int
          id: clips.length,
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
    async deleteClip(_, { id }) {
      // const clipToDelete = await clips.find(clip => clip.id === id);
      const clipToDelete = await clips.find(clip => clip.id === id);
      // @ts-ignore
      const index = clips.indexOf(clipToDelete);
      // const index = await clips.indexOf({ id: id });
      console.log('>>> deleteClip > index >', index);
      // console.log('>>> deleteClip > id >', id);
      // console.log('>>> deleteClip > cache >', cache.readQuery({ id: id }));
      // const clipToDelete = await clips.find(clip => clip.id === id);
      console.log('>>> clipToDelete ', clipToDelete);
      // console.log('>>> clipToDelete > INDEX ', clips.findIndex(clip => clip.id === id));
      // console.log('>>> clipToDelete > Index ', clipToDelete.index);
      // @ts-ignore
      // return clipToDelete.destroy();
      clips.splice(index, 1);
      // return true;
      // return clipToDelete;
      // return _.destroy(clips, clipToDelete);
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
