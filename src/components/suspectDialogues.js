const getRandomDialogue = (dialogues) => {
    return dialogues[Math.floor(Math.random() * dialogues.length)];
  };
  
  const suspectDialogues = {
    "John Smith": {
      motive: [
        "I had a financial dispute with the victim. But I can never do this to him.",
        "We were business rivals, but I never intended harm.",
        "I owed him money, but that doesn't mean I am the culprit.",
        "We were friends, I could never harm him in anyway."
      ],
      weapon: [
        "I didn't touch any weapon. I'm not even sure what the murder weapon was.",
        "I have no idea where the weapon came from. I never saw it before.",
        "I was nowhere near the weapon. This is all a misunderstanding.",
        "The weapon found has no specific connection to me."
      ],
      alibi: [
        "I was at home, and I have no proof, but I wasn't at the crime scene.",
        "I have no proof, but I wasn’t at the scene of the crime.",
        "I was with a friend, but I can't prove it.",
        "I was at a party, and there are witnesses who can confirm it."
      ],
      eyewitness: [
        "I wasn't seen by anyone at the crime scene.",
        "I don’t know if anyone saw me, but I was far from there.",
        "I wasn’t seen by anyone, but that’s because I wasn’t at the crime scene.",
        "How can I be seen by someone if I wasn’t there in the first place?"
      ]
    },
    "Sarah Thompson": {
      motive: [
        "I was the victim's business partner. We had some issues, but no, I can never do this.",
        "We disagreed on many things, but I don’t have a motive for commiting this crime.",
        "Yes, we had conflicts, but that doesn’t make me a culprit.",
        "He was like a brother to me, I could never do this."
      ],
      weapon: [
        "I’ve never handled the murder weapon. It wasn’t my style.",
        "I don’t know what weapon was used, but I’m sure it wasn’t mine.",
        "I didn’t see the weapon, nor would I ever use something like that.",
        "I didn't even know a weapon was found at the crime scene."
      ],
      alibi: [
        "I was at a meeting with clients, they can confirm it.",
        "I was on a video call during the time of the crime.",
        "I was out for a walk, and no one saw me, but I wasn’t near the crime scene.",
        "I was at the library studying, but I don’t have anyone to vouch for me.",
      ],
      eyewitness: [
        "No one has reported seeing me at the crime scene.",
        "I don’t think anyone saw me because I wasn’t anywhere near the area.",
        "There’s no eyewitness linking me to the crime scene.",
        "Someone claims to have seen me, but it’s a case of mistaken identity."
      ]
    },
    "Robert Lewis": {
      motive: [
        "I had a disagreement with the victim, but I would never resort to violence.",
        "We were in competition, but I had no reason to harm him in anyway.",
        "I had issues with him over a deal, but I can never do this.",
        "We had our differences, but I would never hurt him in anyway."
      ],
      weapon: [
        "I’ve never seen the weapon, I wouldn’t even know how to use it.",
        "I don't know what weapon was involved, but I can assure you it wasn’t mine.",
        "I had nothing to do with the weapon, and I would never use something like that.",
        "I had no idea that a weapon was found at the crime scene."
      ],
      alibi: [
        "I was out with friends that night, but I can't remember the exact details.",
        "I was with my friends, but no one remembers the time clearly.",
        "I was at home sleeping, there’s no way I could’ve been involved.",
        "I was at a coffee shop, and the barista might remember me."
      ],

      eyewitness: [
        "I wasn’t seen by anyone, but I was not anywhere near the crime.",
        "I don’t think anyone noticed me at the time, I wasn’t near the scene.",
        "I wasn’t around the crime scene, so no one could have seen me.",
        "A witness has said he saw me, but he has a history with me and is making false accusations."
      ]
    }
  };
  
  export const getSuspectDialogue = (suspect, question) => {
    if (suspectDialogues[suspect]) {
      return getRandomDialogue(suspectDialogues[suspect][question]);
    }
    return "I don't have an answer for that.";
  };  