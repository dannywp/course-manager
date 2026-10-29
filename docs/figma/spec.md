# Figma node spec

Generated from `nodes.json`. One line per visible node: type, name, size, radius, auto-layout (direction, gap, padding top/right/bottom/left), fills, strokes, effects, and text style (family, weight, size/line-height, letter-spacing, case, colour).

## Overview (desktop list) (3:7764)

```
FRAME 'Overview' 1440x1024 VERTICAL gap=10.0 pad=[0, 0, 0, 0] fill=['#F5F5F5']
  FRAME 'Main Container' 1440x1024 VERTICAL gap=0 pad=[0, 0, 0, 0]
    INSTANCE '[Portal] Top navigation' 1440x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0] fill=['#222222']
      FRAME 'Product identification' 252x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
        FRAME 'Icon wrapper' 48x48
          INSTANCE 'Trackman' 14x14
            GROUP 'Logomark' 14x14
              VECTOR 'Vector' 9x14 fill=['#EC691A']
              VECTOR 'Vector' 10x14 fill=['#EC691A']
          FRAME 'Divider' 1x20 fill=['#7B7B7B']
        INSTANCE 'View switcher' 204x36 r=4.0 HORIZONTAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0]
          TEXT '[Product name]' 144x9 Inter 600 12.0/14.5 ls=2.88 UPPER color=['#FFFFFF'] 'Facility portal'
      FRAME 'Spacer' 1253x48
    FRAME 'Main Content' 1440x976 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
      FRAME 'Main View' 1440x976 VERTICAL gap=0 pad=[0, 0, 0, 0]
        INSTANCE 'Header' 1440x104 VERTICAL gap=0 pad=[0, 0, 0, 0]
          INSTANCE 'Page Header' 1392x104 HORIZONTAL gap=4.0 pad=[18.0, 40.0, 18.0, 40.0] fill=['#FFFFFF']
            FRAME 'Frame 10720' 70x55 HORIZONTAL gap=610.0 pad=[0, 0, 0, 0]
              FRAME 'Frame 10717' 70x55 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 10716' 70x55 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                  FRAME 'Button + Title + Subtitle ' 67x32 VERTICAL gap=1.0 pad=[0, 0, 0, 0]
                    FRAME 'button + title' 67x32 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                      TEXT 'Title' 91x31 Inter 700 22.0/30.8 ls=0.0  color=['#414141'] 'Courses'
                  FRAME 'Subtitle' 70x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Subtitle' 179x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Browse and add golf courses'
        FRAME 'Content Area' 1440x872 r=8.0 VERTICAL gap=32.0 pad=[40.0, 40.0, 40.0, 40.0]
          FRAME 'Frame 633534' 1360x32 HORIZONTAL gap=16.0 pad=[0, 0, 0, 0]
            INSTANCE 'Button' 148x32 r=4.0 HORIZONTAL gap=4.0 pad=[0, 24.0, 0, 24.0] fill=['#EC691A']
              TEXT 'Label' 100x12 Inter 600 13.0/12.0 ls=0.0  color=['#FFFFFF'] 'Create a course'
          FRAME 'Frame 633928' 1360x928 VERTICAL gap=32.0 pad=[0, 0, 0, 0]
            FRAME 'Frame 633926' 1360x448 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
                FRAME 'Frame 633929' 140x68 VERTICAL gap=10.0 pad=[24.0, 24.0, 24.0, 24.0]
                  INSTANCE 'Label' 92x20 r=4.0 HORIZONTAL gap=4.0 pad=[4.0, 8.0, 4.0, 8.0] fill=['#FFFFFF']
                    INSTANCE 'Icon' 12x12
                      VECTOR 'Icon' 12x11 fill=['#414141']
                    TEXT 'Label' 60x10 Inter 700 11.0/10.0 ls=0.22 UPPER color=['#414141'] 'Featured'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 44x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Albany'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 97x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Hidden Canyon'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 77x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'St. Andrews'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 70x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 2/5'
            FRAME 'Frame 633927' 1360x448 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
```

## Overview / Menu open (3:10387)

```
FRAME 'Overview/Menu open' 1440x1024 VERTICAL gap=10.0 pad=[0, 0, 0, 0] fill=['#F5F5F5']
  FRAME 'Main Container' 1440x1024 VERTICAL gap=0 pad=[0, 0, 0, 0]
    INSTANCE '[Portal] Top navigation' 1440x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0] fill=['#222222']
      FRAME 'Product identification' 252x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
        FRAME 'Icon wrapper' 48x48
          INSTANCE 'Trackman' 14x14
            GROUP 'Logomark' 14x14
              VECTOR 'Vector' 9x14 fill=['#EC691A']
              VECTOR 'Vector' 10x14 fill=['#EC691A']
          FRAME 'Divider' 1x20 fill=['#7B7B7B']
        INSTANCE 'View switcher' 204x36 r=4.0 HORIZONTAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0]
          TEXT '[Product name]' 144x9 Inter 600 12.0/14.5 ls=2.88 UPPER color=['#FFFFFF'] 'Facility portal'
      FRAME 'Spacer' 1253x48
    FRAME 'Main Content' 1440x976 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
      FRAME 'Main View' 1440x976 VERTICAL gap=0 pad=[0, 0, 0, 0]
        INSTANCE 'Header' 1440x104 VERTICAL gap=0 pad=[0, 0, 0, 0]
          INSTANCE 'Page Header' 1392x104 HORIZONTAL gap=4.0 pad=[18.0, 40.0, 18.0, 40.0] fill=['#FFFFFF']
            FRAME 'Frame 10720' 70x55 HORIZONTAL gap=610.0 pad=[0, 0, 0, 0]
              FRAME 'Frame 10717' 70x55 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 10716' 70x55 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                  FRAME 'Button + Title + Subtitle ' 67x32 VERTICAL gap=1.0 pad=[0, 0, 0, 0]
                    FRAME 'button + title' 67x32 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                      TEXT 'Title' 91x31 Inter 700 22.0/30.8 ls=0.0  color=['#414141'] 'Courses'
                  FRAME 'Subtitle' 70x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Subtitle' 179x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Browse and add golf courses'
        FRAME 'Content Area' 1440x872 r=8.0 VERTICAL gap=32.0 pad=[40.0, 40.0, 40.0, 40.0]
          FRAME 'Frame 633534' 1360x32 HORIZONTAL gap=16.0 pad=[0, 0, 0, 0]
            INSTANCE 'Button' 148x32 r=4.0 HORIZONTAL gap=4.0 pad=[0, 24.0, 0, 24.0] fill=['#EC691A']
              TEXT 'Label' 100x12 Inter 600 13.0/12.0 ls=0.0  color=['#FFFFFF'] 'Create a course'
          FRAME 'Frame 633928' 1360x928 VERTICAL gap=32.0 pad=[0, 0, 0, 0]
            FRAME 'Frame 633926' 1360x448 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
                FRAME 'Frame 633929' 140x68 VERTICAL gap=10.0 pad=[24.0, 24.0, 24.0, 24.0]
                  INSTANCE 'Label' 92x20 r=4.0 HORIZONTAL gap=4.0 pad=[4.0, 8.0, 4.0, 8.0] fill=['#FFFFFF']
                    INSTANCE 'Icon' 12x12
                      VECTOR 'Icon' 12x11 fill=['#414141']
                    TEXT 'Label' 60x10 Inter 700 11.0/10.0 ls=0.22 UPPER color=['#414141'] 'Featured'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] DROP_SHADOW(#000000@0.10 off={'x': 0.0, 'y': 5.0} blur=15.0 spread=0)
                INSTANCE 'Image Container' 280x328 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                    TEXT 'Title' 80x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Difficulty 4/5'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 115x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'M: 5 592m F: 4 800 m'
                  INSTANCE 'Button' 32x32 r=4.0 HORIZONTAL gap=4.0 pad=[8.0, 8.0, 8.0, 8.0] fill=['#F5F5F5']
                    INSTANCE 'Icon' 16x16
                      VECTOR 'Icon' 15x3 fill=['#414141']
                    RECTANGLE 'OnClick' 32x32 r=3.9746835231781006 fill=['#A0A0A0'] stroke=['#414141'] w=0.9936708807945251  opacity=0.20000000298023224
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 77x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'St. Andrews'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 70x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 2/5'
            FRAME 'Frame 633927' 1360x448 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
              INSTANCE 'Card' 316x448 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
  INSTANCE 'Menu' 192x90 r=4.0 VERTICAL gap=2.0 pad=[4.0, 4.0, 4.0, 4.0] fill=['#FFFFFF'] DROP_SHADOW(#000000@0.10 off={'x': 0.0, 'y': 5.0} blur=15.0 spread=0)
    INSTANCE '.Menu items' 184x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
      INSTANCE 'Icons/Pencil' 16x16
        BOOLEAN_OPERATION 'Icon' 16x16 fill=['#414141']
      TEXT 'Action' 144x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Edit'
    INSTANCE '.Menu items' 184x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
      INSTANCE 'Icons/Trash' 16x16
        BOOLEAN_OPERATION 'Icon' 14x16 fill=['#414141']
      TEXT 'Action' 144x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Delete'
```

## Mobile list (6:22203)

```
FRAME 'Mobile' 402x874 VERTICAL gap=0 pad=[0, 0, 0, 0] fill=['#F5F5F5']
  INSTANCE '[Portal] Top navigation' 402x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0] fill=['#222222']
    FRAME 'Product identification' 252x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
      FRAME 'Icon wrapper' 48x48
        INSTANCE 'Trackman' 14x14
          GROUP 'Logomark' 14x14
            VECTOR 'Vector' 9x14 fill=['#EC691A']
            VECTOR 'Vector' 10x14 fill=['#EC691A']
        FRAME 'Divider' 1x20 fill=['#7B7B7B']
      INSTANCE 'View switcher' 204x36 r=4.0 HORIZONTAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0]
        TEXT '[Product name]' 144x9 Inter 600 12.0/14.5 ls=2.88 UPPER color=['#FFFFFF'] 'Facility portal'
    FRAME 'Spacer' 1253x48
  INSTANCE 'Header' 402x57 VERTICAL gap=0 pad=[0, 0, 0, 0]
    INSTANCE 'Page Header' 1392x104 HORIZONTAL gap=4.0 pad=[18.0, 40.0, 18.0, 40.0] fill=['#FFFFFF']
      FRAME 'Frame 10720' 70x55 HORIZONTAL gap=610.0 pad=[0, 0, 0, 0]
        FRAME 'Frame 10717' 70x55 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
          FRAME 'Frame 10716' 70x55 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
            FRAME 'Button + Title + Subtitle ' 67x32 VERTICAL gap=1.0 pad=[0, 0, 0, 0]
              FRAME 'button + title' 67x32 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                TEXT 'Title' 61x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Courses'
  FRAME 'Content Area' 402x769 r=8.0 VERTICAL gap=32.0 pad=[16.0, 16.0, 16.0, 16.0]
    FRAME 'Frame 633534' 370x32 HORIZONTAL gap=16.0 pad=[0, 0, 0, 0]
      INSTANCE 'Button' 148x32 r=4.0 HORIZONTAL gap=4.0 pad=[0, 24.0, 0, 24.0] fill=['#EC691A']
        TEXT 'Label' 100x12 Inter 600 13.0/12.0 ls=0.0  color=['#FFFFFF'] 'Create a course'
    FRAME 'Frame 633928' 370x2607 VERTICAL gap=32.0 pad=[0, 0, 0, 0]
      FRAME 'Frame 633926' 370x2141 VERTICAL gap=32.0 pad=[0, 0, 0, 0]
        INSTANCE 'Card' 370x511 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
          INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
          FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
            FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
            FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
              FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                  TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
            FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
              TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
              TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
          FRAME 'Frame 633929' 140x68 VERTICAL gap=10.0 pad=[24.0, 24.0, 24.0, 24.0]
            INSTANCE 'Label' 92x20 r=4.0 HORIZONTAL gap=4.0 pad=[4.0, 8.0, 4.0, 8.0] fill=['#FFFFFF']
              INSTANCE 'Icon' 12x12
                VECTOR 'Icon' 12x11 fill=['#414141']
              TEXT 'Label' 60x10 Inter 700 11.0/10.0 ls=0.22 UPPER color=['#414141'] 'Featured'
        INSTANCE 'Card' 370x511 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
          INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
          FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
            FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
            FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
              FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                  TEXT 'Title' 44x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Albany'
            FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
              TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
              TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
        INSTANCE 'Card' 370x511 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
          INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
          FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
            FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
            FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
              FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                  TEXT 'Title' 97x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Hidden Canyon'
            FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
              TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
              TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
        INSTANCE 'Card' 370x511 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
          INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
          FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
            FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
            FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
              FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                  TEXT 'Title' 77x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'St. Andrews'
            FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
              TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
              TEXT 'Description' 70x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 2/5'
      FRAME 'Frame 633927' 370x434 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
        INSTANCE 'Card' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
          INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
          FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
            FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
            FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
              FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                  TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
            FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
              TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
              TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
        INSTANCE 'Card' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
          INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
          FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
            FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
            FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
              FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                  TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
            FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
              TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
              TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
        INSTANCE 'Card' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
          INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
          FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
            FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
            FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
              FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                  TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
            FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
              TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
              TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
        INSTANCE 'Card' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] opacity=0.0
          INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
          FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
            FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
            FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
              FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                  TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
            FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
              TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
              TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
```

## Editor / Empty (6:13342)

```
FRAME 'Editor/Empty' 1440x1127 VERTICAL gap=10.0 pad=[0, 0, 0, 0] fill=['#F5F5F5']
  FRAME 'Main Container' 1440x1127 VERTICAL gap=0 pad=[0, 0, 0, 0]
    FRAME 'Main Content' 1440x1127 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
      FRAME 'Main View' 1440x1127 VERTICAL gap=0 pad=[0, 0, 0, 0]
        FRAME 'Frame 633932' 1440x200 VERTICAL gap=0 pad=[0, 0, 0, 0]
          INSTANCE '[Portal] Top navigation' 1440x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0] fill=['#222222']
            FRAME 'Product identification' 252x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
              FRAME 'Icon wrapper' 48x48
                INSTANCE 'Trackman' 14x14
                  GROUP 'Logomark' 14x14
                    VECTOR 'Vector' 9x14 fill=['#EC691A']
                    VECTOR 'Vector' 10x14 fill=['#EC691A']
                FRAME 'Divider' 1x20 fill=['#7B7B7B']
              INSTANCE 'View switcher' 204x36 r=4.0 HORIZONTAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0]
                TEXT '[Product name]' 144x9 Inter 600 12.0/14.5 ls=2.88 UPPER color=['#FFFFFF'] 'Facility portal'
            FRAME 'Spacer' 1253x48
          INSTANCE 'Header' 1440x104 VERTICAL gap=0 pad=[0, 0, 0, 0]
            INSTANCE 'Page Header' 1392x104 HORIZONTAL gap=4.0 pad=[18.0, 40.0, 18.0, 40.0] fill=['#FFFFFF']
              FRAME 'Frame 10720' 70x55 HORIZONTAL gap=610.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 10717' 70x55 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                  FRAME 'Frame 10716' 70x55 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Button + Title + Subtitle ' 67x32 VERTICAL gap=1.0 pad=[0, 0, 0, 0]
                      FRAME 'button + title' 67x32 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 91x31 Inter 700 22.0/30.8 ls=0.0  color=['#414141'] 'Courses'
                    FRAME 'Subtitle' 70x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                      TEXT 'Subtitle' 179x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Browse and add golf courses'
          INSTANCE 'menu' 1440x48 VERTICAL gap=0 pad=[0, 0, 0, 0] fill=['#FFFFFF'] stroke=['#E0E0E0'] w=1.0 {'top': 1.0, 'right': 0.0, 'bottom': 1.0, 'left': 0.0}
            FRAME 'Content' 272x48 HORIZONTAL gap=270.0 pad=[0, 40.0, 0, 40.0]
              FRAME 'Button Group' 192x32 HORIZONTAL gap=16.0 pad=[0, 0, 0, 0]
                INSTANCE 'Button' 96x32 r=4.0 HORIZONTAL gap=4.0 pad=[0, 24.0, 0, 24.0] fill=['#EC691A']
                  TEXT 'Label' 31x12 Inter 600 13.0/12.0 ls=0.0  color=['#FFFFFF'] 'Save'
        FRAME 'Frame 633930' 1440x927 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
          FRAME 'Frame 633931' 814x927 VERTICAL gap=0 pad=[0, 0, 0, 0]
            FRAME 'Container' 814x461 VERTICAL gap=24.0 pad=[40.0, 40.0, 24.0, 40.0]
              FRAME 'Container' 1215x40 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x40 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x40 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 105x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Course details'
                    TEXT 'Explainer' 1215x19 Inter 400 13.0/18.2 ls=0.0  color=['#7B7B7B'] 'Review the information and make changes if necessary.'
              FRAME 'Frame 633214' 656x290 VERTICAL gap=32.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 633215' 656x48 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
                  INSTANCE 'Edit input type in panel' 312x48 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    INSTANCE 'Input' 312x48 r=8.0 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                      FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                        TEXT 'Label' 288x13 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Title*'
                  INSTANCE 'Edit input type in panel' 312x48 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                      FRAME 'Label + Input' 268x36 VERTICAL gap=0 pad=[0, 0, 0, 0]
                        TEXT 'Label' 52x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Difficulty*'
                        FRAME 'Input' 268x20 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                          TEXT 'Value' 268x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '1'
                      INSTANCE 'Icon Right' 12x7
                        VECTOR 'Caret' 12x7 fill=['#414141']
                INSTANCE 'Edit input type in panel' 656x130 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  INSTANCE 'Text area' 656x130 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 656x130 r=8.0 HORIZONTAL gap=8.0 pad=[16.0, 12.0, 16.0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                      TEXT 'Label' 632x98 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Course description*'
                INSTANCE 'Edit input type in panel' 312x48 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  INSTANCE 'Input' 312x48 r=8.0 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                      TEXT 'Label' 288x13 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Par*'
              INSTANCE 'Checkbox' 124x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                INSTANCE 'Checkbox button' 16x16 r=4.0 HORIZONTAL gap=8.0 pad=[8.0, 8.0, 8.0, 8.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                FRAME 'Label' 100x19 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  TEXT 'Label' 100x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Featured course'
            FRAME 'Container' 814x141 VERTICAL gap=24.0 pad=[24.0, 40.0, 24.0, 40.0]
              FRAME 'Container' 1215x21 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 63x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Location'
              FRAME 'Frame 633570' 656x48 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
                INSTANCE 'Input' 312x48 r=8.0 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                  FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                    TEXT 'Label' 288x13 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'City*'
                INSTANCE 'Select' 312x48 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                  FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                    FRAME 'Label + Input' 268x36 VERTICAL gap=0 pad=[0, 0, 0, 0]
                      TEXT 'Label' 48x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Country*'
                      FRAME 'Input' 268x20 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Value' 268x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Denmark'
                    INSTANCE 'Icon Right' 12x7
                      VECTOR 'Caret' 12x7 fill=['#414141']
            FRAME 'Container' 814x325 VERTICAL gap=24.0 pad=[24.0, 40.0, 40.0, 40.0]
              FRAME 'Container' 1215x21 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 45x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Image'
              INSTANCE 'Drag & Drop Area' 734x216 r=8.0 VERTICAL gap=10.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 9761' 734x216 r=8.0 VERTICAL gap=8.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['#E0E0E0'] stroke=['#E0E0E0'] w=1.0 
                  INSTANCE 'Icons/Cloud Upload' 32x32
                    VECTOR 'Icon' 32x27 fill=['#7B7B7B']
                  TEXT 'Drag & Drop' 702x19 Inter 600 13.0/18.2 ls=0.0  color=['#7B7B7B'] 'Drag & Drop '
                  TEXT 'Drag & drop or click to browse images and videos' 702x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Drag & drop or click to browse images and videos'
          FRAME 'Description Markdown' 626x561 VERTICAL gap=16.0 pad=[40.0, 0, 0, 0]
            FRAME 'Container' 304x460 VERTICAL gap=16.0 pad=[0, 0, 0, 0]
              TEXT 'Subheader' 88x10 Inter 700 11.0/10.0 ls=0.22 UPPER color=['#A0A0A0'] 'Card Preview'
              INSTANCE 'Card' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
```

## Editor / In progress (6:14001)

```
FRAME 'Editor/In progress' 1440x1127 VERTICAL gap=10.0 pad=[0, 0, 0, 0] fill=['#F5F5F5']
  FRAME 'Main Container' 1440x1127 VERTICAL gap=0 pad=[0, 0, 0, 0]
    FRAME 'Main Content' 1440x1127 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
      FRAME 'Main View' 1440x1127 VERTICAL gap=0 pad=[0, 0, 0, 0]
        FRAME 'Frame 633932' 1440x200 VERTICAL gap=0 pad=[0, 0, 0, 0]
          INSTANCE '[Portal] Top navigation' 1440x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0] fill=['#222222']
            FRAME 'Product identification' 252x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
              FRAME 'Icon wrapper' 48x48
                INSTANCE 'Trackman' 14x14
                  GROUP 'Logomark' 14x14
                    VECTOR 'Vector' 9x14 fill=['#EC691A']
                    VECTOR 'Vector' 10x14 fill=['#EC691A']
                FRAME 'Divider' 1x20 fill=['#7B7B7B']
              INSTANCE 'View switcher' 204x36 r=4.0 HORIZONTAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0]
                TEXT '[Product name]' 144x9 Inter 600 12.0/14.5 ls=2.88 UPPER color=['#FFFFFF'] 'Facility portal'
            FRAME 'Spacer' 1253x48
          INSTANCE 'Header' 1440x104 VERTICAL gap=0 pad=[0, 0, 0, 0]
            INSTANCE 'Page Header' 1392x104 HORIZONTAL gap=4.0 pad=[18.0, 40.0, 18.0, 40.0] fill=['#FFFFFF']
              FRAME 'Frame 10720' 70x55 HORIZONTAL gap=610.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 10717' 70x55 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                  FRAME 'Frame 10716' 70x55 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Button + Title + Subtitle ' 67x32 VERTICAL gap=1.0 pad=[0, 0, 0, 0]
                      FRAME 'button + title' 67x32 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 91x31 Inter 700 22.0/30.8 ls=0.0  color=['#414141'] 'Courses'
                    FRAME 'Subtitle' 70x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                      TEXT 'Subtitle' 179x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Browse and add golf courses'
          INSTANCE 'menu' 1440x48 VERTICAL gap=0 pad=[0, 0, 0, 0] fill=['#FFFFFF'] stroke=['#E0E0E0'] w=1.0 {'top': 1.0, 'right': 0.0, 'bottom': 1.0, 'left': 0.0}
            FRAME 'Content' 272x48 HORIZONTAL gap=270.0 pad=[0, 40.0, 0, 40.0]
              FRAME 'Button Group' 192x32 HORIZONTAL gap=16.0 pad=[0, 0, 0, 0]
                INSTANCE 'Button' 96x32 r=4.0 HORIZONTAL gap=4.0 pad=[0, 24.0, 0, 24.0] fill=['#EC691A']
                  TEXT 'Label' 31x12 Inter 600 13.0/12.0 ls=0.0  color=['#FFFFFF'] 'Save'
        FRAME 'Frame 633930' 1440x927 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
          FRAME 'Frame 633931' 814x927 VERTICAL gap=0 pad=[0, 0, 0, 0]
            FRAME 'Container' 814x461 VERTICAL gap=24.0 pad=[40.0, 40.0, 24.0, 40.0]
              FRAME 'Container' 1215x40 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x40 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x40 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 105x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Course details'
                    TEXT 'Explainer' 1215x19 Inter 400 13.0/18.2 ls=0.0  color=['#7B7B7B'] 'Review the information and make changes if necessary.'
              FRAME 'Frame 633214' 656x290 VERTICAL gap=32.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 633215' 656x48 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
                  INSTANCE 'Edit input type in panel' 312x48 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    INSTANCE 'Input' 312x48 r=8.0 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                      FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                        TEXT 'Label' 288x13 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Title*'
                  INSTANCE 'Edit input type in panel' 312x48 r=8.0 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#EC691A'] w=1.0  DROP_SHADOW(#EC691A@0.25 off={'x': 0.0, 'y': 0.0} blur=4.0 spread=0)
                      FRAME 'Label + Input' 268x35 VERTICAL gap=0 pad=[0, 0, 0, 0]
                        TEXT 'Label' 52x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Difficulty*'
                        FRAME 'Input' 268x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                          TEXT 'Placeholder' 268x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Choose an option'
                      INSTANCE 'Icon Right' 12x7
                        VECTOR 'Caret' 12x7 fill=['#414141']
                INSTANCE 'Edit input type in panel' 656x130 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  INSTANCE 'Text area' 656x130 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 656x130 r=8.0 HORIZONTAL gap=8.0 pad=[16.0, 12.0, 16.0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                      TEXT 'Label' 632x98 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Course description*'
                INSTANCE 'Menu' 312x216 r=4.0 VERTICAL gap=2.0 pad=[4.0, 4.0, 4.0, 4.0] fill=['#FFFFFF'] DROP_SHADOW(#000000@0.10 off={'x': 0.0, 'y': 5.0} blur=15.0 spread=0)
                  INSTANCE 'Menu item 01' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
                    TEXT 'Action' 288x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '1'
                  INSTANCE 'Menu item 02' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
                    TEXT 'Action' 288x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '2'
                  INSTANCE 'Menu item 03' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
                    TEXT 'Action' 288x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '3'
                  INSTANCE 'Menu item 04' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
                    TEXT 'Action' 288x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '4'
                  INSTANCE 'Menu item 05' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
                    TEXT 'Action' 288x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '5'
                INSTANCE 'Edit input type in panel' 312x48 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  INSTANCE 'Input' 312x48 r=8.0 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                      TEXT 'Label' 288x13 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Par*'
              INSTANCE 'Checkbox' 124x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                INSTANCE 'Checkbox button' 16x16 r=4.0 HORIZONTAL gap=8.0 pad=[8.0, 8.0, 8.0, 8.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                FRAME 'Label' 100x19 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  TEXT 'Label' 100x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Featured course'
            FRAME 'Container' 814x141 VERTICAL gap=24.0 pad=[24.0, 40.0, 24.0, 40.0]
              FRAME 'Container' 1215x21 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 63x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Location'
              FRAME 'Frame 633570' 656x48 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
                INSTANCE 'Input' 312x48 r=8.0 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                  FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                    TEXT 'Label' 288x13 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'City*'
                INSTANCE 'Select' 312x48 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                  FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                    FRAME 'Label + Input' 268x36 VERTICAL gap=0 pad=[0, 0, 0, 0]
                      TEXT 'Label' 53x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Denmark*'
                      FRAME 'Input' 268x20 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Value' 268x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '-'
                    INSTANCE 'Icon Right' 12x7
                      VECTOR 'Caret' 12x7 fill=['#414141']
            FRAME 'Container' 814x325 VERTICAL gap=24.0 pad=[24.0, 40.0, 40.0, 40.0]
              FRAME 'Container' 1215x21 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 45x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Image'
              INSTANCE 'Drag & Drop Area' 734x216 r=8.0 VERTICAL gap=10.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 9761' 734x216 r=8.0 VERTICAL gap=8.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['#E0E0E0'] stroke=['#E0E0E0'] w=1.0 
                  INSTANCE 'Icons/Cloud Upload' 32x32
                    VECTOR 'Icon' 32x27 fill=['#7B7B7B']
                  TEXT 'Drag & Drop' 702x19 Inter 600 13.0/18.2 ls=0.0  color=['#7B7B7B'] 'Drag & Drop '
                  TEXT 'Drag & drop or click to browse images and videos' 702x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Drag & drop or click to browse images and videos'
          FRAME 'Description Markdown' 626x500 VERTICAL gap=16.0 pad=[40.0, 0, 0, 0]
            FRAME 'Container' 304x460 VERTICAL gap=16.0 pad=[0, 0, 0, 0]
              TEXT 'Subheader' 88x10 Inter 700 11.0/10.0 ls=0.22 UPPER color=['#A0A0A0'] 'Card Preview'
              INSTANCE 'Card' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
```

## Editor / Filled (5:12865)

```
FRAME 'Editor/Filled' 1440x975 VERTICAL gap=10.0 pad=[0, 0, 0, 0] fill=['#F5F5F5']
  FRAME 'Main Container' 1440x975 VERTICAL gap=0 pad=[0, 0, 0, 0]
    FRAME 'Main Content' 1440x975 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
      FRAME 'Main View' 1440x975 VERTICAL gap=0 pad=[0, 0, 0, 0]
        FRAME 'Frame 633932' 1440x200 VERTICAL gap=0 pad=[0, 0, 0, 0]
          INSTANCE '[Portal] Top navigation' 1440x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0] fill=['#222222']
            FRAME 'Product identification' 252x48 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
              FRAME 'Icon wrapper' 48x48
                INSTANCE 'Trackman' 14x14
                  GROUP 'Logomark' 14x14
                    VECTOR 'Vector' 9x14 fill=['#EC691A']
                    VECTOR 'Vector' 10x14 fill=['#EC691A']
                FRAME 'Divider' 1x20 fill=['#7B7B7B']
              INSTANCE 'View switcher' 204x36 r=4.0 HORIZONTAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0]
                TEXT '[Product name]' 144x9 Inter 600 12.0/14.5 ls=2.88 UPPER color=['#FFFFFF'] 'Facility portal'
            FRAME 'Spacer' 1253x48
          INSTANCE 'Header' 1440x104 VERTICAL gap=0 pad=[0, 0, 0, 0]
            INSTANCE 'Page Header' 1392x104 HORIZONTAL gap=4.0 pad=[18.0, 40.0, 18.0, 40.0] fill=['#FFFFFF']
              FRAME 'Frame 10720' 70x55 HORIZONTAL gap=610.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 10717' 70x55 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                  FRAME 'Frame 10716' 70x55 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Button + Title + Subtitle ' 67x32 VERTICAL gap=1.0 pad=[0, 0, 0, 0]
                      FRAME 'button + title' 67x32 HORIZONTAL gap=12.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 91x31 Inter 700 22.0/30.8 ls=0.0  color=['#414141'] 'Courses'
                    FRAME 'Subtitle' 70x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                      TEXT 'Subtitle' 179x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Browse and add golf courses'
          INSTANCE 'menu' 1440x48 VERTICAL gap=0 pad=[0, 0, 0, 0] fill=['#FFFFFF'] stroke=['#E0E0E0'] w=1.0 {'top': 1.0, 'right': 0.0, 'bottom': 1.0, 'left': 0.0}
            FRAME 'Content' 272x48 HORIZONTAL gap=270.0 pad=[0, 40.0, 0, 40.0]
              FRAME 'Button Group' 192x32 HORIZONTAL gap=16.0 pad=[0, 0, 0, 0]
                INSTANCE 'Button' 96x32 r=4.0 HORIZONTAL gap=4.0 pad=[0, 24.0, 0, 24.0] fill=['#EC691A']
                  TEXT 'Label' 31x12 Inter 600 13.0/12.0 ls=0.0  color=['#FFFFFF'] 'Save'
        FRAME 'Frame 633930' 1440x775 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
          FRAME 'Frame 633931' 814x775 VERTICAL gap=0 pad=[0, 0, 0, 0]
            FRAME 'Container' 814x461 VERTICAL gap=24.0 pad=[40.0, 40.0, 24.0, 40.0]
              FRAME 'Container' 1215x40 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x40 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x40 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 105x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Course details'
                    TEXT 'Explainer' 1215x19 Inter 400 13.0/18.2 ls=0.0  color=['#7B7B7B'] 'Review the information and make changes if necessary.'
              FRAME 'Frame 633214' 656x290 VERTICAL gap=32.0 pad=[0, 0, 0, 0]
                FRAME 'Frame 633215' 656x48 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
                  INSTANCE 'Edit input type in panel' 312x48 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    INSTANCE 'Input' 312x48 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                      FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                        FRAME 'Label + Input' 288x36 VERTICAL gap=0 pad=[0, 0, 0, 0]
                          TEXT 'Label' 29x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Title*'
                          FRAME 'Input' 80x20 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                            TEXT 'Value' 80x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Adare Manor'
                  INSTANCE 'Edit input type in panel' 312x48 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                      FRAME 'Label + Input' 268x36 VERTICAL gap=0 pad=[0, 0, 0, 0]
                        TEXT 'Label' 52x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Difficulty*'
                        FRAME 'Input' 268x20 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                          TEXT 'Value' 268x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '1'
                      INSTANCE 'Icon Right' 12x7
                        VECTOR 'Caret' 12x7 fill=['#414141']
                INSTANCE 'Edit input type in panel' 656x130 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  INSTANCE 'Text area' 656x130 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 656x130 r=8.0 HORIZONTAL gap=8.0 pad=[6.5, 12.0, 6.5, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                      FRAME 'Label + Input' 632x117 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                        TEXT 'Label' 104x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Course description*'
                        FRAME 'Input' 632x73 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                          TEXT 'Value' 632x73 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'The Golf Course at Adare Manor, host to the Ryder Cup in 2027, offers '
                INSTANCE 'Edit input type in panel' 312x48 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  INSTANCE 'Input' 312x48 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                      FRAME 'Label + Input' 288x36 VERTICAL gap=0 pad=[0, 0, 0, 0]
                        TEXT 'Label' 23x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Par*'
                        FRAME 'Input' 16x20 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                          TEXT 'Value' 16x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] '72'
              INSTANCE 'Checkbox' 124x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                INSTANCE 'Checkbox button' 16x16 r=4.0 HORIZONTAL gap=0 pad=[0, 0, 0, 0] fill=['#EC691A']
                  INSTANCE 'Icons/Checkmark' 8x8
                    VECTOR 'Icon' 8x8 fill=['#FFFFFF']
                FRAME 'Label' 100x19 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  TEXT 'Label' 100x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Featured course'
            FRAME 'Container' 814x141 VERTICAL gap=24.0 pad=[24.0, 40.0, 24.0, 40.0]
              FRAME 'Container' 1215x21 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 63x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Location'
              FRAME 'Frame 633570' 656x48 HORIZONTAL gap=32.0 pad=[0, 0, 0, 0]
                INSTANCE 'Input' 312x48 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                  FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                    FRAME 'Label + Input' 288x36 VERTICAL gap=0 pad=[0, 0, 0, 0]
                      TEXT 'Label' 58x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'City/State*'
                      FRAME 'Input' 58x20 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                        TEXT 'Value' 58x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'California'
                INSTANCE 'Select' 312x48 VERTICAL gap=4.0 pad=[0, 0, 0, 0]
                  FRAME 'Field' 312x48 r=8.0 HORIZONTAL gap=8.0 pad=[0, 12.0, 0, 12.0] fill=['#FFFFFF'] stroke=['#A0A0A0'] w=1.0 
                    FRAME 'Label + Input' 268x36 VERTICAL gap=0 pad=[0, 0, 0, 0]
                      TEXT 'Label' 48x16 Inter 400 11.0/15.4 ls=0.0  color=['#A0A0A0'] 'Country*'
                      FRAME 'Input' 268x20 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Value' 268x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Denmark'
                    INSTANCE 'Icon Right' 12x7
                      VECTOR 'Caret' 12x7 fill=['#414141']
            FRAME 'Container' 814x173 VERTICAL gap=24.0 pad=[24.0, 40.0, 40.0, 40.0]
              FRAME 'Container' 1215x21 VERTICAL gap=8.0 pad=[0, 0, 0, 0]
                FRAME '.Block/Component/Header/Title + Description' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                  FRAME '.--------Block/Component/Header + headline' 1215x21 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 45x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Image'
              FRAME 'Frame 2094' 312x64 r=12.0 HORIZONTAL gap=32.0 pad=[12.0, 12.0, 12.0, 12.0] fill=['#FFFFFF']
                FRAME 'Frame 2081' 165x40 HORIZONTAL gap=16.0 pad=[0, 0, 0, 0]
                  FRAME 'Frame 2082' 40x40 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                  FRAME 'Frame 2080' 109x19 VERTICAL gap=0 pad=[0, 0, 0, 0]
                    TEXT 'Pebble beach.jpg' 109x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble beach.jpg'
                INSTANCE 'Button' 32x32 r=4.0 HORIZONTAL gap=4.0 pad=[8.0, 8.0, 8.0, 8.0] fill=['#F5F5F5']
                  INSTANCE 'Icon' 16x16
                    BOOLEAN_OPERATION 'Icon' 16x16 fill=['#414141']
          FRAME 'Description Markdown' 626x500 VERTICAL gap=16.0 pad=[40.0, 0, 0, 0]
            FRAME 'Container' 304x460 VERTICAL gap=16.0 pad=[0, 0, 0, 0]
              TEXT 'Subheader' 88x10 Inter 700 11.0/10.0 ls=0.22 UPPER color=['#A0A0A0'] 'Card Preview'
              INSTANCE 'Card' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
                INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
                FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
                  FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
                  FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
                    FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
                      FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                        TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
                  FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
                    TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
                    TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
                    TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
                FRAME 'Frame 633929' 140x68 VERTICAL gap=10.0 pad=[24.0, 24.0, 24.0, 24.0]
                  INSTANCE 'Label' 92x20 r=4.0 HORIZONTAL gap=4.0 pad=[4.0, 8.0, 4.0, 8.0] fill=['#FFFFFF']
                    INSTANCE 'Icon' 12x12
                      VECTOR 'Icon' 12x11 fill=['#414141']
                    TEXT 'Label' 60x10 Inter 700 11.0/10.0 ls=0.22 UPPER color=['#414141'] 'Featured'
```

## Delete modal (6:14208)

```
SECTION 'Delete modal' 644x397 fill=['#A0A0A0@0.24'] stroke=['#A3A3A3', '#FF0000'] w=4.0 
  INSTANCE 'Web Modal Dialog' 444x197 VERTICAL gap=0 pad=[0, 0, 0, 0]
    INSTANCE 'Web Modal Dialog/Header/Title Only' 444x56 radii=[8.0, 8.0, 0.0, 0.0] HORIZONTAL gap=0 pad=[0, 24.0, 0, 24.0] fill=['#FFFFFF'] stroke=['#F5F5F5'] w=1.0 {'top': 0.0, 'right': 0.0, 'bottom': 1.0, 'left': 0.0}
      FRAME 'Icon + Title' 77x21 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
        TEXT 'Title' 101x21 Inter 600 15.0/21.0 ls=0.0  color=['#414141'] 'Delete course'
      INSTANCE 'Icons/Close' 16x16
        VECTOR 'Icon' 14x14 fill=['#414141']
    INSTANCE 'Web Modal Dialog/Content/Text' 444x121 HORIZONTAL gap=8.0 pad=[24.0, 32.0, 24.0, 24.0] fill=['#FFFFFF']
      TEXT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget vitae condimentum sed sed etiam vulputate sed. Rutrum nec, nunc sodales nunc cursus euismod cursus. Montes, rutrum facilisis fusce pellentesque.' 388x37 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Are you sure you want to delete this course? You will lose all data at'
    INSTANCE 'Web Modal Dialog/Footer/Two Buttons' 444x56 radii=[0.0, 0.0, 8.0, 8.0] VERTICAL gap=0 pad=[0, 24.0, 0, 24.0] fill=['#FFFFFF'] stroke=['#F5F5F5'] w=1.0 {'top': 1.0, 'right': 0.0, 'bottom': 0.0, 'left': 0.0}
      FRAME 'Frame 52' 208x32 HORIZONTAL gap=16.0 pad=[0, 0, 0, 0]
        INSTANCE 'Button' 95x32 r=4.0 HORIZONTAL gap=4.0 pad=[165.0, 165.0, 165.0, 165.0] fill=['#F5F5F5']
          TEXT 'Label' 44x12 Inter 600 13.0/12.0 ls=0.0  color=['#414141'] 'Cancel'
        INSTANCE 'Button' 97x32 r=4.0 HORIZONTAL gap=4.0 pad=[0, 24.0, 0, 24.0] fill=['#EE1B34']
          TEXT 'Label' 41x12 Inter 600 13.0/12.0 ls=0.0  color=['#FFFFFF'] 'Delete'
```

## Components (card states, menu, menu items) (6:14210)

```
SECTION '❖: Components' 1190x674 fill=['#7A2ED6@0.08'] stroke=['#A3A3A3', '#FF0000'] w=4.0 
  COMPONENT_SET 'Card' 707x474 r=5.0 stroke=['#8A38F5'] w=1.0 
    COMPONENT 'State=Default' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF']
      INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
      FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
        FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
          TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
        FRAME 'Title Container' 264x19 HORIZONTAL gap=4.0 pad=[0, 0, 0, 0]
          FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
            FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
        FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
          TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
          TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
          TEXT 'Description' 71x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Difficulty: 4/5'
    COMPONENT 'State=Hover' 304x434 r=16.0 VERTICAL gap=12.0 pad=[12.0, 12.0, 20.0, 12.0] fill=['#FFFFFF'] DROP_SHADOW(#000000@0.10 off={'x': 0.0, 'y': 5.0} blur=15.0 spread=0)
      INSTANCE 'Image Container' 280x328 r=4.0 VERTICAL gap=16.0 pad=[16.0, 16.0, 16.0, 16.0] fill=['IMAGE']
      FRAME 'Text Container' 280x62 VERTICAL gap=4.0 pad=[0, 8.0, 0, 8.0]
        FRAME 'Frame 633924' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
          TEXT 'Title' 84x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'California, US'
          TEXT 'Title' 80x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Difficulty 4/5'
        FRAME 'Title Container' 264x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
          FRAME 'Title Wrapper' 152x19 HORIZONTAL gap=0 pad=[0, 0, 0, 0]
            FRAME 'Title Text Wrapper' 152x19 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
              TEXT 'Title' 152x19 Inter 600 13.0/18.2 ls=0.0  color=['#414141'] 'Pebble Beach Golf Links'
        FRAME 'Frame 633925' 264x16 HORIZONTAL gap=8.0 pad=[0, 0, 0, 0]
          TEXT 'Description' 34x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'Par 72'
          TEXT '•' 7x16 Inter 400 12.0/16.0 ls=0.0  color=['#7B7B7B'] '•'
          TEXT 'Description' 115x16 Inter 400 11.0/15.4 ls=0.0  color=['#7B7B7B'] 'M: 5 592m F: 4 800 m'
        INSTANCE 'Button' 32x32 r=3.9746835231781006 HORIZONTAL gap=3.9746835231781006 pad=[7.949367046356201, 7.949367046356201, 7.949367046356201, 7.949367046356201] fill=['#F5F5F5']
          INSTANCE 'Icon' 16x16
            VECTOR 'Icon' 15x3 fill=['#414141']
  COMPONENT_SET '.Menu items' 240x336 r=5.0 stroke=['#8A38F5'] w=1.0 
    COMPONENT 'Property 1=Selected' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#F5F5F5']
      INSTANCE 'Icons/Pencil' 16x16
        BOOLEAN_OPERATION 'Icon' 16x16 fill=['#414141']
      TEXT 'Action' 128x12 Lato 400 13.0/12.0 ls=0.0  color=['#414141'] 'Edit'
      INSTANCE 'Checkmark' 16x16
        VECTOR 'Icon' 16x16 fill=['#EC691A']
    COMPONENT 'Property 1=Disabled' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
      INSTANCE 'Icons/Pencil' 16x16
        BOOLEAN_OPERATION 'Icon' 16x16 fill=['#A0A0A0']
      TEXT 'Action' 152x19 Inter 400 13.0/18.2 ls=0.0  color=['#A0A0A0'] 'Edit'
    COMPONENT 'Property 1=Hover' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FBFBFB']
      INSTANCE 'Icons/Pencil' 16x16
        BOOLEAN_OPERATION 'Icon' 16x16 fill=['#414141']
      TEXT 'Action' 152x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Edit'
    COMPONENT 'Property 1=Default' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
      INSTANCE 'Icons/Pencil' 16x16
        BOOLEAN_OPERATION 'Icon' 16x16 fill=['#414141']
      TEXT 'Action' 152x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Edit'
    COMPONENT 'Property 1=On Click' 192x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FBFBFB'] stroke=['#EC691A'] w=1.0  DROP_SHADOW(#EC691A@0.25 off={'x': 0.0, 'y': 0.0} blur=4.0 spread=0)
      INSTANCE 'Icons/Pencil' 16x16
        BOOLEAN_OPERATION 'Icon' 16x16 fill=['#414141']
      TEXT 'Action' 152x12 Lato 400 13.0/12.0 ls=0.0  color=['#414141'] 'Edit'
  COMPONENT 'Menu' 192x90 r=4.0 VERTICAL gap=2.0 pad=[4.0, 4.0, 4.0, 4.0] fill=['#FFFFFF'] DROP_SHADOW(#000000@0.10 off={'x': 0.0, 'y': 5.0} blur=15.0 spread=0)
    INSTANCE '.Menu items' 184x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
      INSTANCE 'Icons/Pencil' 16x16
        BOOLEAN_OPERATION 'Icon' 16x16 fill=['#414141']
      TEXT 'Action' 144x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Edit'
    INSTANCE '.Menu items' 184x40 r=4.0 HORIZONTAL gap=8.0 pad=[0, 8.0, 0, 8.0] fill=['#FFFFFF']
      INSTANCE 'Icons/Trash' 16x16
        BOOLEAN_OPERATION 'Icon' 14x16 fill=['#414141']
      TEXT 'Action' 144x19 Inter 400 13.0/18.2 ls=0.0  color=['#414141'] 'Delete'
```

