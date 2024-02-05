import matter from "gray-matter";
import { PostMeta } from "../types.ts";
import { Sort } from "../types.ts";

export const firstMockPost = `---
date: 2024-01-28
title: Dumbbell wants to set things right.
---

# Dumbbell wants to set things right.

## First subheading

it's a paragraph of test post one!!!

\`\`\`js
let count = 0

function increment() {
  count++
}
\`\`\`

yay!

## Second subheading

Donec efficitur nec mauris eu dignissim. Pellentesque et nunc ex. Quisque ornare lectus a ex blandit, at faucibus orci ultricies. Vivamus sit amet ante tincidunt, placerat lorem nec, mollis felis. In vitae massa sit amet dolor efficitur ultrices quis a arcu. Nullam ultricies, nibh nec ullamcorper sollicitudin, mauris ligula eleifend risus, et rhoncus elit nibh vitae erat. Nullam purus nisi, posuere ut ultrices eget, ultricies non felis. Aenean commodo aliquam purus, at rutrum elit dapibus a. Donec consectetur, orci in suscipit venenatis, libero ex iaculis elit, sed interdum erat turpis tempus purus. Nam at tristique enim. Pellentesque ornare lorem ut risus convallis, ac luctus augue convallis. Mauris tristique est eget pellentesque ultrices. 

## Third subheading

Donec pharetra, nisl vel facilisis aliquet, lorem elit pharetra mi, non sollicitudin diam lectus eget leo. Nunc sollicitudin velit erat, et hendrerit ligula aliquam sit amet. Pellentesque fermentum cursus magna. Nulla placerat ut nisl at pellentesque. Vestibulum in luctus nunc. Proin felis eros, sagittis vel neque ac, facilisis varius sem. Proin id rhoncus libero, eget pretium arcu. Proin vitae nulla sit amet lacus bibendum malesuada ut ut tellus. Maecenas mauris lacus, condimentum nec faucibus vitae, vulputate ac quam. Mauris ex diam, tempus sit amet leo vel, rhoncus molestie massa. Curabitur at libero maximus, tincidunt mi vitae, feugiat leo. In non dictum lorem, sit amet sollicitudin massa. Sed sed justo eu justo dapibus venenatis. Nulla facilisi. 
`;

export const secondMockPost = `---
date: 2024-02-10
title: Rock music revels in authority.
---

# Rock music revels in authority.

## First subheading

it's a paragraph of test post one!!!

yay!

## Second subheading

Pellentesque non quam ac purus rhoncus aliquam eu ac purus. Curabitur ac auctor tortor, sit amet egestas ex. Quisque dapibus vel nulla et hendrerit. Sed erat velit, bibendum nec elit non, mollis sodales elit. Nunc elementum posuere urna ac iaculis. Suspendisse egestas sollicitudin pharetra. Suspendisse et maximus enim. Praesent sed augue placerat, elementum orci ut, eleifend turpis. Mauris ac blandit elit. Pellentesque volutpat sem vel risus ultrices imperdiet.

\`\`\`js
let count = 0

function increment() {
  count++
}
\`\`\`

## Third subheading

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam aliquam, lectus sit amet condimentum elementum, enim est vehicula elit, vitae blandit quam dolor a diam. Nulla vulputate pretium nulla, sit amet consectetur justo lobortis congue. Quisque convallis ex purus, eget blandit purus venenatis quis. Maecenas fermentum, odio at blandit convallis, felis metus faucibus ante, vitae molestie metus libero sed ex. Proin rutrum purus et metus faucibus, vel pharetra dui ultrices. Curabitur suscipit tortor risus, id facilisis ipsum vehicula et. Donec scelerisque lectus ac risus iaculis, id faucibus tellus bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at sollicitudin odio, id ornare metus. Ut vel nibh ipsum. Donec sagittis porta eros sed tincidunt. Sed vel nibh non libero consectetur pharetra.
`;

export const thirdMockPost = `---
date: 2024-03-18
title: Another day was always the second best.
---

# Another day was always the second best.

## First subheading

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin accumsan ante ut faucibus. Suspendisse congue eget sapien vitae euismod. Praesent eu elementum nisi. Cras vel dolor vel purus porttitor semper nec sed quam. Mauris ullamcorper ornare dapibus. Aenean ultricies commodo ligula, at tempus neque elementum a. Mauris sit amet eros auctor, aliquet nisl porttitor, molestie eros. Aenean lobortis mattis erat eu scelerisque.

Etiam auctor dictum cursus. Aenean euismod sodales nunc, id aliquam lacus placerat at. Sed sem diam, imperdiet laoreet pharetra quis, mattis nec dui. Maecenas mi nunc, tempor sit amet aliquam vitae, maximus a ex. Duis lorem massa, pharetra sed convallis non, semper non ipsum. Aenean eleifend augue ut elit malesuada, in commodo eros congue. Proin vel nibh vitae erat dignissim mattis. Phasellus congue urna vitae posuere molestie. Vestibulum suscipit diam nec ex faucibus, vel viverra lacus ultricies.

## Second subheading

Aliquam pharetra ullamcorper iaculis. Sed quis orci quis velit facilisis auctor eget non quam. Donec dignissim vestibulum nisl, quis sodales enim posuere sed. Aliquam erat volutpat. Aliquam quis rhoncus justo. Phasellus vitae turpis purus. Integer id blandit quam, in molestie massa. In molestie arcu vitae sodales dignissim. Curabitur lacus velit, viverra ut venenatis nec, vestibulum vitae risus. Nam tempor quis justo tristique viverra. Quisque sit amet enim at justo euismod ultricies. Aliquam eget diam auctor, gravida risus sed, efficitur nunc.

\`\`\`js
let count = 0

function increment() {
  count++
}
\`\`\`

## Third subheading

In lobortis ultrices ullamcorper. Praesent porttitor rutrum arcu ac tempor. Sed ac elit nibh. Cras elit purus, egestas sollicitudin consectetur quis, pretium nec orci. Sed pulvinar massa ut magna pellentesque varius. Mauris rutrum turpis sem, nec pharetra arcu rhoncus vitae. Sed sit amet ornare ante, id consectetur eros. Nullam vel erat bibendum, scelerisque dolor non, congue lorem. Etiam tempor augue a massa tincidunt malesuada. Cras id ornare magna, a convallis nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent nibh magna, tempor at tempus vel, rhoncus eleifend nisi. Sed aliquam ipsum eget faucibus varius.
`;

export const fourthMockPost = `---
date: 2024-03-28
title: Lucky number slevin rains heavily.
---

# Lucky number slevin rains heavily.

## First subheading

Praesent et odio est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In sollicitudin vulputate metus eget sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc et porta lectus. Curabitur sagittis dapibus nunc eget varius. Pellentesque ut vestibulum ex. Aliquam vulputate ex nec neque scelerisque tristique. Suspendisse rutrum lacus eu turpis varius, sit amet viverra dui lacinia. Ut imperdiet augue consectetur turpis condimentum mattis. Maecenas hendrerit tellus lectus, a lobortis purus porta ut. Curabitur ultrices dapibus justo in pulvinar. Mauris pharetra efficitur ex, ut elementum ipsum consequat ut. Curabitur orci dui, facilisis in placerat iaculis, feugiat a turpis. Aliquam bibendum dignissim augue, nec semper sem dictum convallis. 

\`\`\`ts
function Person(name: string) {
  this.name = name
}

Person.prototype.greet = function() {
  console.log(\`Hello!, my name is $\{this.name}\`)
}

const john = new Person('John')
john.greet()
\`\`\`

## Second subheading

Phasellus pulvinar elementum viverra. Duis tincidunt tortor a magna sodales tincidunt. Quisque posuere a mi et tincidunt. Morbi varius, sapien in ullamcorper ultrices, nibh nibh hendrerit ante, ac dignissim lorem metus a neque. Vivamus ultricies, sapien eget scelerisque mollis, nunc urna vulputate quam, sed bibendum metus justo et lacus. Mauris ultricies venenatis aliquet. Sed sed malesuada libero. Aenean et quam varius, mollis lorem ut, condimentum metus. In et nisl egestas, commodo nibh viverra, eleifend dui. Pellentesque faucibus ullamcorper metus, eget venenatis ex suscipit et. Quisque non elit id lectus commodo lacinia. Pellentesque hendrerit enim enim, a iaculis enim viverra malesuada.

## Third subheading

Integer mi elit, varius quis nisl at, facilisis eleifend massa. Suspendisse efficitur semper sapien, ut tristique sapien gravida auctor. Fusce in dui eget diam mattis consequat sed ut eros. Nunc vel venenatis nisl. Morbi commodo nisi quis eros euismod, at vulputate tellus ultrices. Proin egestas fermentum finibus. Suspendisse vitae eros dictum, bibendum neque in, blandit massa. Sed vulputate turpis sapien, sit amet aliquet metus feugiat sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent venenatis hendrerit lacus, ut venenatis dui sagittis quis.
`;

export const fifthMockPost = `---
date: 2024-04-14
title: A fly does not make any sense.
---

# A fly does not make any sense.

<div class="notice info">
  <h3>Info notice block</h3>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus tempor metus, eu condimentum ex vulputate at. Sed fringilla non.</p>
</div>

## First subheading

Cras dictum urna id arcu sollicitudin sagittis. Sed sit amet est in ipsum pellentesque vestibulum sed non nunc. Nulla aliquet mi erat, eu porta tortor egestas quis. Morbi sodales mattis ipsum ut convallis. Duis in mattis est, in rhoncus massa. Suspendisse eu neque ut diam consequat rhoncus et auctor libero. Aenean iaculis facilisis diam vitae ornare. Duis tincidunt finibus diam at aliquam. Sed ut nunc laoreet, malesuada dolor sit amet, porttitor nisi. Aenean bibendum, eros nec convallis pharetra, nisl mi feugiat elit, quis fringilla enim ipsum et ante.

<div class="notice warning">
  <h3>Warning notice block</h3>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus tempor metus, eu condimentum ex vulputate at. Sed fringilla non.</p>
</div>

## Second subheading

Donec et ante a lorem convallis euismod quis in sapien. Donec consectetur scelerisque dolor id commodo. Ut sapien ex, facilisis et est id, ultricies sagittis metus. Sed interdum placerat turpis a tempus. Praesent vitae dolor nulla. Phasellus sed ultrices eros. Nullam rhoncus felis at urna euismod, sit amet tincidunt risus facilisis. Aliquam erat volutpat. Nam sodales, dui a luctus mollis, tellus lorem aliquam tortor, at mollis ipsum quam eget purus. Donec quis velit mauris. In imperdiet urna tortor, vel gravida sem fringilla eu. Mauris ultrices urna mauris, vitae eleifend nisl scelerisque eu.

<div class="notice success">
  <h3>Success notice block</h3>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus tempor metus, eu condimentum ex vulputate at. Sed fringilla non.</p>
</div>

Mauris faucibus laoreet ullamcorper. Duis et urna non ligula facilisis suscipit. Nulla accumsan, nunc non tincidunt viverra, nisl odio fringilla est, ac tincidunt justo est ut ipsum. Nunc efficitur diam a blandit accumsan. Proin dictum purus eget nisl gravida egestas. Maecenas egestas eleifend nibh, eu accumsan erat pretium a. Morbi mollis velit et malesuada accumsan. Duis eget ligula bibendum, suscipit orci sed, gravida purus.

Quisque rhoncus tincidunt enim eu consequat. Proin ut ante orci. Pellentesque in ante augue. Praesent gravida cursus dolor, in iaculis lectus accumsan a. Suspendisse potenti. Sed laoreet posuere pulvinar. Proin ac eros eu purus fringilla placerat eu id arcu.

\`\`\`ts
// person.ts

function Person(name: string) {
  this.name = name
}

Person.prototype.greet = function() {
  console.log(\`Hello!, my name is $\{this.name}\`)
}

const john = new Person('John')
john.greet()
\`\`\`

## Third subheading

In feugiat id enim ut cursus. Vivamus vitae euismod nisi. Curabitur lacinia arcu ut nibh placerat, ac posuere elit eleifend. Pellentesque placerat, risus sed sagittis pharetra, nunc nisl dictum libero, sit amet pharetra erat nisl id nisi. Phasellus sit amet turpis est. Ut gravida risus ac hendrerit dapibus. Suspendisse pulvinar pretium pharetra. Integer ac mauris et est bibendum dapibus.

<div class="notice danger">
  <h3>Danger notice block</h3>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus tempor metus, eu condimentum ex vulputate at. Sed fringilla non.</p>
</div>

Aliquam erat volutpat. Suspendisse efficitur ullamcorper risus vel feugiat. Integer eu accumsan enim. Sed aliquam ipsum tortor. Nulla nec magna dapibus, aliquet nibh at, hendrerit dui. Fusce at nunc justo. Donec bibendum ipsum sit amet luctus finibus.
`;

export const sixthMockPost = `---
date: 2024-05-01
title: Camouflage paint does not make any sense.
---

# Camouflage paint does not make any sense.

## First subheading

Morbi ac sem aliquet, ornare elit sit amet, mollis sapien. Aenean in nibh at quam pulvinar imperdiet. Pellentesque iaculis, ante at tincidunt elementum, tellus nisl molestie orci, vitae cursus augue eros eget turpis. Donec non tristique ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean tristique nunc nisi, sed malesuada mi vulputate non. Curabitur facilisis ornare erat, in dapibus ipsum vestibulum pretium. Ut ac nisi arcu. Nulla viverra eros quis nibh consectetur, venenatis aliquet dolor accumsan.

Phasellus euismod, nunc eget accumsan semper, elit ligula posuere neque, quis tincidunt elit lacus ac enim. Fusce viverra, odio a posuere euismod, leo arcu pretium mi, eget pharetra sem mi vel nisi. Etiam convallis placerat ornare. Ut nec nunc sit amet leo blandit congue quis nec tellus. Phasellus eget scelerisque orci, at mattis orci. Mauris accumsan auctor sapien sed accumsan. Nunc tempor ante nec massa elementum, vitae hendrerit nisi tristique. Donec consequat nulla vitae est feugiat ultrices. In luctus tellus eros, efficitur consectetur metus gravida nec.

## Second subheading

Morbi mauris tortor, eleifend vel mauris vel, gravida ultrices libero. Ut id vulputate felis, eget commodo eros. Ut egestas ultricies sagittis. Sed quis egestas lectus. Donec consectetur suscipit nisi, id ultricies justo tincidunt et. Mauris pretium tellus felis, ac varius sapien posuere vel. Aenean dui magna, mollis sed gravida vel, luctus non mauris. Donec pulvinar dapibus ante sed placerat. Donec nec justo enim. Cras vel lorem eu est vestibulum pellentesque. Donec ut odio sapien. Praesent eleifend, nunc sit amet placerat aliquam, lorem eros venenatis libero, a ultrices nisl ligula ut enim. Sed sagittis lectus at porta maximus. Vestibulum euismod imperdiet placerat. Sed molestie quam lectus, eu sagittis leo tempus id.

\`\`\`ts
let fruits: string[] = ['apple', 'orange', 'banana']
\`\`\`

## Third subheading

Aenean aliquet augue vitae consectetur vestibulum. Morbi quis nulla aliquet, blandit arcu sed, egestas leo. Duis tempus urna a urna varius euismod. Praesent ornare sodales odio id vulputate. Donec sodales scelerisque ex. Fusce efficitur viverra est a vestibulum. Sed tincidunt a est ultrices venenatis. Suspendisse suscipit scelerisque dui quis luctus. Praesent at arcu mi. Cras ac tempor est, non placerat sem. Nulla laoreet hendrerit sodales. Integer ut justo molestie, egestas orci vitae, laoreet sapien. Vivamus ullamcorper, metus tempor ullamcorper feugiat, lectus tortor consectetur erat, in cursus nunc enim maximus ante. Proin quam mauris, iaculis id tempus quis, faucibus id mi. Nulla vestibulum egestas leo in fringilla.
`;

const mockPosts = [
  { slug: "test-post-one", content: firstMockPost },
  { slug: "test-post-two", content: secondMockPost },
  { slug: "test-post-three", content: thirdMockPost },
  { slug: "test-post-four", content: fourthMockPost },
  { slug: "test-post-five", content: fifthMockPost },
  { slug: "test-post-six", content: sixthMockPost },
];

class MockPostsCache {
  meta: PostMeta[] = [];
  posts: Map<string, string> = new Map();

  ascSortedMeta?: PostMeta[] = [];
  descSortedMeta?: PostMeta[];

  recentMeta?: PostMeta[];

  constructor() {
    this.init();
  }

  init() {
    for (const mockPost of mockPosts) {
      const { content, data } = matter(mockPost.content);
      const meta = { date: data.date, title: data.title, slug: mockPost.slug };

      this.meta.push(meta);
      this.posts.set(mockPost.slug, content);
    }
  }

  getPost(slug: string) {
    return this.posts.get(slug);
  }

  getSortedByDateMeta(sort: Sort = Sort.desc): PostMeta[] {
    if (sort === Sort.asc) {
      return structuredClone(this.meta).sort((a: PostMeta, b: PostMeta) =>
        a.date.getTime() - b.date.getTime()
      );
    } else {
      return structuredClone(this.meta).sort((a: PostMeta, b: PostMeta) =>
        b.date.getTime() - a.date.getTime()
      );
    }
  }

  getRecentMeta() {
    if (this.recentMeta) return this.recentMeta;
    this.recentMeta = this.getSortedByDateMeta().slice(0, 5);

    return this.recentMeta;
  }
}

export const mockPostsCache = new MockPostsCache();
