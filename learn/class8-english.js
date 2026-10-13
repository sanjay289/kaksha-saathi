// Original study companion for the 17 chapters of Bihar SCERT Radiance Part 3.
// Chapter titles/order: https://bepclots.bihar.gov.in/class-viii-english-radiance/
const Q=(question,options,answer,explanation)=>({question,options,answer,explanation});
const L=(title,kind,focus,ideas,words,skill,task,quiz)=>({title,kind,focus,ideas,words,skill,task,quiz});
const chapters=[
  L('I Wonder','Poem','This poem invites us to ask questions about the world. Read each question slowly and notice how curiosity shapes the poem.',[
    'A repeated question can give a poem its rhythm and hold its ideas together.',
    'Wonder means wanting to know how or why something happens.',
    'When reading a poem, look for images you can picture in your mind.'
  ],[['wonder','आश्चर्य करना'],['curious','जिज्ञासु'],['imagine','कल्पना करना']],
  'Question words: who, what, when, where, why and how begin different kinds of questions.',
  'Write two original “I wonder…” questions about nature.',[
    Q('Which word asks for a reason?',['Where','Why','When'],1,'Why asks for a reason.'),
    Q('What does “curious” mean?',['Eager to learn','Very sleepy','Full of anger'],0,'A curious person wants to learn or find out.')]),
  L('Sleep','Poem','Think about rest, dreams and the feelings connected with sleep. Notice words that create a calm mood.',[
    'A poem can use soft sounds and images to create a peaceful feeling.',
    'The speaker is the voice we hear in a poem; it is not always the poet.',
    'Look for words that appeal to the senses, such as sight or sound.'
  ],[['slumber','नींद'],['peaceful','शांत'],['dream','सपना']],
  'Adjectives describe nouns: a peaceful night, a quiet room.',
  'Describe a peaceful evening in three English sentences.',[
    Q('Which phrase uses an adjective?',['sleep quietly','a quiet night','at night'],1,'Quiet describes the noun night.'),
    Q('What is the speaker in a poem?',['The voice heard in the poem','Only the reader','The book publisher'],0,'The speaker is the voice speaking in a poem.')]),
  L("The Raja's Dream",'Story','Read the Raja’s dream as a story of imagination and quick thinking. Follow what the characters say and how they respond.',[
    'In a story, dialogue shows a character’s thoughts and reactions.',
    'A dream may be impossible in real life, which can make a tale amusing.',
    'Notice the problem, the response and the ending while reading.'
  ],[['raja','राजा'],['dream','सपना'],['clever','चतुर']],
  'Direct speech uses quotation marks around the exact words a person says.',
  'Retell the story in four sentences using your own words.',[
    Q('Which punctuation marks show exact spoken words?',['Quotation marks','Hyphens','Commas only'],0,'Quotation marks enclose direct speech.'),
    Q('Which word best describes quick, smart thinking?',['Clever','Careless','Silent'],0,'Clever means quick to understand or solve a problem.')]),
  L('The Ice-Cream Man','Poem','Explore the sights and feelings of a hot day and the excitement caused by an ice-cream seller.',[
    'Poets use sensory details so readers can picture a scene.',
    'A comparison can make an ordinary moment more vivid.',
    'Identify the words that suggest heat, colour or taste.'
  ],[['vendor','विक्रेता'],['delight','खुशी'],['flavour','स्वाद']],
  'A simile compares two things with like or as: “as cool as ice”.',
  'Write two lines describing your favourite summer treat without copying the poem.',[
    Q('Which sentence contains a simile?',['The ice is cold.','The cart is as bright as a rainbow.','I like ice cream.'],1,'A simile often uses like or as.'),
    Q('Which sense helps us notice a flavour?',['Taste','Hearing','Touch'],0,'We notice flavour with our sense of taste.')]),
  L('One Two Three','Story','Track the sequence of events in this story. Pay attention to who makes a claim and how others test it.',[
    'Sequence words such as first, next and finally clarify an event order.',
    'A claim is something a character says is true; look for evidence in the story.',
    'The title may act as a clue to an important event or pattern.'
  ],[['claim','दावा'],['sequence','क्रम'],['evidence','प्रमाण']],
  'Use first, then and finally to write events in order.',
  'Make a three-step timeline of the story after reading it.',[
    Q('Which word is best for the last event?',['First','Finally','Before'],1,'Finally introduces the last step or event.'),
    Q('What helps you test a claim?',['Evidence','A guess only','Loud speech'],0,'Evidence gives a reason to believe or question a claim.')]),
  L('Tess Buys a Miracle','Story','Read Tess’s actions carefully. Discuss how hope, care and determination affect the story.',[
    'A character’s actions often reveal what matters to them.',
    'Miracle means an extraordinary event that seems difficult to explain.',
    'Look for the problem Tess faces and the steps she takes.'
  ],[['miracle','चमत्कार'],['determined','दृढ़ निश्चयी'],['care','देखभाल']],
  'Past-tense verbs tell completed actions: buys becomes bought.',
  'Write a short paragraph about a time you helped someone.',[
    Q('What is the past tense of buy?',['Buyed','Bought','Buying'],1,'Bought is the past tense of buy.'),
    Q('A determined person is someone who…',['Keeps trying','Gives up immediately','Never listens'],0,'Determination means continuing to try.')]),
  L('The Mountain and the Squirrel','Poem','Compare the mountain and the squirrel. Consider how different strengths can both be valuable.',[
    'The poem presents two very different sizes and abilities.',
    'A contrast shows how two things differ.',
    'Think about why one character need not do everything the other can do.'
  ],[['mountain','पर्वत'],['squirrel','गिलहरी'],['talent','प्रतिभा']],
  'Comparatives help us compare: small, smaller; large, larger.',
  'Write two sentences about different strengths of two animals.',[
    Q('Which word is a comparative adjective?',['Large','Larger','Largest'],1,'Larger compares the size of two things.'),
    Q('What is a contrast?',['A difference between things','A list of names','A repeated sound'],0,'A contrast highlights differences.')]),
  L('Measure for Measure','Story','Notice how the characters judge skill and reward. Ask whether being good at one task means being good at every task.',[
    'A story’s title can hint at its central question.',
    'Inferences are conclusions drawn from clues in the text.',
    'Separate what a character says from what the story shows.'
  ],[['measure','मापना'],['reward','इनाम'],['judgement','निर्णय']],
  'Prefixes can reverse meaning: happy → unhappy; honest → dishonest.',
  'Write two reasons why a good artist may need different skills from a good minister.',[
    Q('What is the opposite of honest?',['Unhonest','Dishonest','Inhonest'],1,'The common opposite is dishonest.'),
    Q('An inference should be based on…',['Clues in the text','A random guess','The cover colour'],0,'An inference uses evidence or clues.')]),
  L('Sikkim','Travel / place','Use this chapter to learn how a writer presents a place. Identify details about landscape, people and culture.',[
    'Descriptive writing helps a reader picture a place.',
    'Look for facts about location and the writer’s observations.',
    'Keep facts and opinions separate when taking notes.'
  ],[['landscape','भूदृश्य'],['culture','संस्कृति'],['region','क्षेत्र']],
  'A proper noun begins with a capital letter: Sikkim, India.',
  'Write a short travel note about a place in Bihar you know.',[
    Q('Which spelling is a proper noun?',['sikkim','Sikkim','SIkkim'],1,'Place names begin with a capital letter.'),
    Q('Which sentence is an opinion?',['Sikkim is an Indian state.','The view is the most beautiful in the world.','India has states.'],1,'Most beautiful expresses personal judgement.')]),
  L('My Land','Poem','Think about the feelings a speaker has for a homeland. Look at images of nature, belonging and identity.',[
    'A poem’s mood is the feeling it creates for the reader.',
    'Imagery uses words that help readers see, hear or feel something.',
    'Ask which images make the speaker’s land special.'
  ],[['homeland','मातृभूमि'],['belong','संबंध होना'],['pride','गर्व']],
  'Possessive words show ownership or connection: my, your, our.',
  'Write four original lines about a place you feel connected to.',[
    Q('Which word shows belonging?',['Our','Quickly','Because'],0,'Our is a possessive word.'),
    Q('What is imagery in writing?',['Words that create sense pictures','Only punctuation','A list of dates'],0,'Imagery helps the reader imagine sights, sounds or feelings.')]),
  L('My First Role in Life','Memoir','Read this account as a memory of a first stage experience. Notice how the narrator describes people and unexpected moments.',[
    'A memoir tells about events from someone’s own life.',
    'The narrator’s feelings can change during an experience.',
    'When retelling, keep the order of events clear.'
  ],[['role','भूमिका'],['stage','मंच'],['audience','दर्शक']],
  'Use the simple past for finished events: acted, watched, laughed.',
  'Write five lines about your first time speaking or performing before a group.',[
    Q('What is a memoir?',['A personal memory or account','A weather chart','A shopping list'],0,'A memoir describes events from a person’s life.'),
    Q('Which verb is in the simple past?',['Act','Acted','Acting'],1,'Acted tells about a completed action.')]),
  L('Beat the Clock','Study skill','Use this chapter to think about time, planning and working within a limit. Notice how the text encourages action.',[
    'A plan helps divide a large task into smaller steps.',
    'A deadline is the time by which something should be finished.',
    'Choose the most important task first when time is short.'
  ],[['deadline','समय-सीमा'],['schedule','समय-सारणी'],['priority','प्राथमिकता']],
  'Time expressions such as before, after and during show when events happen.',
  'Make a simple one-hour study plan with a short break.',[
    Q('What is a deadline?',['A time to finish by','A line on paper','A kind of clock'],0,'A deadline is the time by which work is due.'),
    Q('Which word means “later than”?',['Before','After','During'],1,'After means later than an event or time.')]),
  L('My Shadow','Poem','Observe how the speaker describes a shadow. Think about changes in its shape and the poem’s playful tone.',[
    'A shadow appears when an object blocks light.',
    'A playful poem can make an ordinary thing seem surprising.',
    'Notice the speaker’s observations and comparisons.'
  ],[['shadow','छाया'],['shape','आकार'],['playful','चंचल']],
  'Personification gives human qualities to a non-human thing.',
  'Observe your shadow at two times of day and write what changes.',[
    Q('What creates a shadow?',['An object blocking light','Only rain','A loud sound'],0,'A shadow forms when an object blocks light.'),
    Q('Giving a shadow human actions is called…',['Personification','Punctuation','Translation'],0,'Personification gives human qualities to a thing.')]),
  L('She Lived Her Dream','Biography','Read about astronaut Kalpana Chawla. Follow her interest in flying, the challenges she faced and the goal she reached.',[
    'A biography tells the story of another person’s life.',
    'Kalpana Chawla pursued studies and a career connected with flight and space.',
    'A timeline helps organise the stages of a person’s life.'
  ],[['achievement','उपलब्धि'],['obstacle','बाधा'],['ambition','महत्त्वाकांक्षा']],
  'Use because to connect an action with a reason.',
  'After reading, list three events in the person’s life in order.',[
    Q('What is a biography?',['A life story of another person','A recipe','A weather report'],0,'A biography tells about someone else’s life.'),
    Q('Which word means a difficulty?',['Obstacle','Achievement','Talent'],0,'An obstacle is something that makes progress difficult.')]),
  L('The Outsider','Poem','Listen to the voice of a speaker who uses a wheelchair and wants others to recognise their thoughts and abilities.',[
    'The first-person voice lets us hear the speaker’s own experience.',
    'The poem questions unfair assumptions about disability.',
    'Notice the speaker’s wish to communicate and take part in life.'
  ],[['outsider','बाहरी व्यक्ति'],['belonging','अपनापन'],['respect','सम्मान']],
  'The pronoun I tells us the poem is spoken from a first-person point of view.',
  'Write three respectful ways to include a classmate with a disability in a group activity.',[
    Q('Whose voice do we hear in a first-person poem?',['The speaker’s','Only a reporter’s','No one’s'],0,'First-person language lets the speaker tell their own experience.'),
    Q('What should we recognise in every person?',['Their ideas and abilities','Only their appearance','Only what others assume'],0,'The poem asks readers to recognise the speaker as a person with ideas and abilities.')]),
  L('Harvesting Rain','Environment','Learn the idea of collecting rainwater. Connect the chapter with practical ways to save water.',[
    'Rainwater harvesting means collecting and storing rainwater for later use.',
    'Water conservation means using water carefully and avoiding waste.',
    'Notice the sequence in any method explained in the text.'
  ],[['harvest','इकट्ठा करना'],['conserve','बचाना'],['storage','भंडारण']],
  'Instruction writing uses clear action verbs: collect, filter, store.',
  'Write three steps your school could take to use less water.',[
    Q('What does rainwater harvesting mean?',['Collecting rainwater','Making rain fall','Wasting tap water'],0,'It is the collection and storage of rainwater.'),
    Q('Which word is an action verb?',['Storage','Collect','Useful'],1,'Collect names an action.')]),
  L('The Recycling Rap','Poem / rap','Read this rhythmic piece aloud. Notice its message about waste and the repeated sounds that make it memorable.',[
    'Recycling turns used materials into materials for new products.',
    'A rap uses rhythm and often rhyme or repetition.',
    'Think about reducing, reusing and recycling in daily life.'
  ],[['recycle','पुनर्चक्रण करना'],['reuse','फिर उपयोग करना'],['rhythm','लय']],
  'Rhyme means words ending with similar sounds, such as day and play.',
  'Write a two-line original rap encouraging classmates to reuse paper.',[
    Q('Which pair of words rhymes?',['Day / play','Book / bag','Rain / sun'],0,'Day and play have similar ending sounds.'),
    Q('What does reuse mean?',['Use something again','Throw it away','Make it dirty'],0,'Reuse means to use an item again.')])
];
