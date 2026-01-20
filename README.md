By: Brady & Gabby

# Project Overview  
**Name:** Sonic Species Collection  
**Tagline:** The total *unofficial* collection of traits of every species in the Sonic series  

**To-Do:** 
- Add traits to database
- Make call to database to display traits of species using the dropdown  
[Trait list](https://github.com/Gabby-Moon/w26-sdev372-sonic-species-collection/blob/main/NOTES.md)

---

**Problem Statement:** What traits do each of the species in the Sonic series have? How can I make a fan-character look accurate to it's species if I can't find *official* references among all the other fan-characters? Are there *official* characters that are (Species Name)?  
**Users:** Sonic (2-D and 3-D) Fan-Artists.  

## Features  
**MVP:** A database of species and corelating traits. An API to read the database. A page with a dropdown list of species that then shows a list of common traits for that species (possibly with photos).  
*EX:*  
Species: Wolf  
Traits:
- Sharp Ears
- Separated Eyes
- Visible Fangs
- Longer Fluff on Sides of Face
- Little to No Pattern
- Long Tail
- Fluffy Tail
- Long muzzle
- Long Nose (Male)
- Short Triangle Nose (Female)


**Extended:**  Photos if not implemented. Showing all traits in groups. Showing official characters that have the traits or group of traits to their species.  
*Character Ex. using markdown:* ![Gadget the Wolf, A red bipedal wolf character, trying on red shoes. Has the Sonic Channel watermark in the bottom left corner.](https://static.wikia.nocookie.net/sonic/images/e/e2/SonicChannelDecember2025CommemorativeArtwork.jpeg/revision/latest?cb=20251224104314)  
Wolf Traits shown: Sharp ears. Eyes separated. Visible fang(s). Longer fluff on sides of face. Longer & fluffier tail. Long muzzle. Long nose (Male).

## Data Model  
**Core:** Multiple tables in a data set with connecter tables. Tables for species `(KEY INT, STRING species_name)`, traits `(KEY INT, STRING trait_name, STRING trait_description, FOREIGN KEY INT species)`, Official characters `(STRING character_name, FOREIGN KEY INT species, FOREIGN KEY LIST INT traits, BOOLEAN is_common)`, Images for traits `(KEY INT, LIST STRING images_url, FOREIGN KEY INT trait)`.  
Relationships: Each table connect to one another through foreign keys, connecting the images to traits, traits to species, and characters to species and traits.

## User Experience  
**Flows:** Users would pick a species they want to see the traits of and it would show the traits, or they could pick a trait and see what species have that trait. It could show pictures to give a visual if the user would benefit from visual references.  
**Sketches:** Sketch will be in ascii art due to file limitations and no proper way to upload image.  
```
                            **Sonic Species Collection**
The total *unofficial* collection of traits of every species in the Sonic series  
---------------------------------------------------------------------------------

                                Search By Species

                            Species: ____________ ↓
                                    | Wolf         |
                                    | Hedgehog     |
                                    | Tenrec       |
                                    | Cat          |
                                    ----------------
                            
                                [Species] Traits
        -----------     -------------     -------------     ------------
        |         |     |           |     |           |     |          |
        |         |     |           |     |           |     |          |
        |         |     |           |     |           |     |          |
        -----------     -------------     -------------     ------------
         Trait One        Trait Two        Trait Three       Trait Four

---------------------------------------------------------------------------------

                                   Search By Trait

                               Trait: ____________ ↓
                                     | Fluffy Tail  |
                                     | Big Ears     |
                                     | Pointed Nose |
                                     | Shell        |
                                     ----------------
                            
                                [Species] Traits
        -----------     -------------     -------------     ------------
        |         |     |           |     |           |     |          |
        |         |     |           |     |           |     |          |
        |         |     |           |     |           |     |          |
        -----------     -------------     -------------     ------------
        Species One      Species Two      Species Three     Species Four
```

```
                                        App
                                         |
                                     Main Page
                                     /       \
                                Species    Traits
                                  Page       Page
                                   \          /
                                     Drop Down      ← Fetch requests
                                     /       \             |
                                      ReUsable      ←      |
                                       Cards
```
