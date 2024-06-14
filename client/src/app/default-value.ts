export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "Start Here",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Patrika is a generative AI based journaling app. Add context to your journal from the menu and proceed to generate content based on your documents. ",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Format documents in the way you ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "intended",
        },
        {
          type: "text",
          text: ", ",
        },
        {
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: {
                color: "#9333EA",
              },
            },
          ],
          text: "save",
        },
        {
          type: "text",
          text: " them and come back to them at ",
        },
        {
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
          text: "any given time",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Use the / command to insert blocks and:",
        },
        {
          type: "hardBreak",
        },
      ],
    },
    {
      type: "bulletList",
      attrs: {
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ask AI to generate content based on your documents",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Format it as per your need",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
