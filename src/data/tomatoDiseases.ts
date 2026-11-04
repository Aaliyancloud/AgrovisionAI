import { DiseaseInfo, SampleLeaf } from '../types/disease';
import healthyLeafImageUrl from '../assets/images/tomato_leaf_healthy_1793801735546.jpg';
import blightLeafImageUrl from '../assets/images/tomato_leaf_blight_1793801736560.jpg';

export const TOMATO_DISEASES: DiseaseInfo[] = [
  {
    id: 'healthy',
    name: 'Healthy Tomato Foliage',
    scientificName: 'Solanum lycopersicum (Vigorous)',
    pathogenType: 'Healthy',
    description: 'The leaf exhibits strong cellular turgor, uniform chlorophyll distribution, intact cuticle layer, and no visible necrotic or chlorotic lesions. The stomatal conductance and photosynthesis are optimal.',
    primarySymptoms: [
      'Deep, consistent emerald green pigmentation across lamina',
      'Intact serrated leaf margins without curling or dieback',
      'Normal leaf trichome density with zero fungal hyphae or bacterial exudates',
      'Flexible, turgid petiole structure capable of efficient nutrient transport'
    ],
    earlyStageSigns: [
      'Smooth leaf surface with healthy specular sheen',
      'Vibrant pale-green emerging apex leaflets'
    ],
    advancedSigns: [
      'Stable mature canopy providing shade and optimal fruit set'
    ],
    favorableConditions: {
      temperature: '20°C - 26°C (68°F - 79°F)',
      humidity: '50% - 65% RH',
      spreadVector: 'Not applicable (Pathogen-free environment)'
    },
    treatment: {
      organic: [
        'Apply compost tea every 14 days to strengthen beneficial phyllosphere microflora',
        'Maintain organic straw mulch (5 cm layer) to buffer root zone temperature'
      ],
      chemical: [
        'Balanced 10-10-10 or 5-10-10 N-P-K fertilizer based on soil testing',
        'Ensure micronutrient availability (Calcium, Magnesium, Iron chelate)'
      ],
      cultural: [
        'Drip irrigation at base of plant (avoid wetting upper foliage)',
        'Ensure 45-60 cm spacing between vines to promote air circulation'
      ],
      prevention: [
        'Routine weekly leaf inspection with AgroVision AI',
        'Sterilize pruning shears between rows using 70% isopropyl alcohol'
      ]
    },
    sampleImageUrl: healthyLeafImageUrl,
    typicalSeverity: 'None',
    contagionRisk: 'None'
  },
  {
    id: 'early_blight',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'Fungal',
    description: 'A destructive fungal pathogen that initiates on older lower foliage. The distinctive hallmark is brown-to-black necrotic lesions marked by concentric rings resembling a target board, often encircled by a chlorotic yellow halo.',
    primarySymptoms: [
      'Concentric circular target-board lesions on mature leaflets',
      'Pronounced chlorotic (yellow) halos around dark necrotic margins',
      'Progressive lower-canopy defoliation advancing upward toward the vine apex',
      'Sunscald on developing fruit following premature canopy loss'
    ],
    earlyStageSigns: [
      'Small (1-2 mm) irregular dark brown specks on lowest leaves',
      'Slight yellowing surrounding initial leaf puncture sites'
    ],
    advancedSigns: [
      'Lesions coalesce up to 15 mm across, turning brittle and dry',
      'Stem collar rot and sunken velvety dark lesions on fruit calyx'
    ],
    favorableConditions: {
      temperature: '24°C - 29°C (75°F - 84°F)',
      humidity: '> 85% RH with alternating wet/dry cycles',
      spreadVector: 'Wind-blown conidia and rain-splash from infected soil debris'
    },
    treatment: {
      organic: [
        'Apply copper octanoate (copper soap) or Bacillus subtilis bio-fungicide',
        'Spray dilute neem oil (1% emulsion) every 7-10 days on lower canopy',
        'Strip off and bag all infected leaves showing target spots immediately'
      ],
      chemical: [
        'Preventive sprays with Chlorothalonil or Mancozeb before spore release',
        'Systemic strobilurin fungicides (e.g., Azoxystrobin) in commercial settings'
      ],
      cultural: [
        'Bottom-prune all foliage within 30 cm of ground level to stop soil splash',
        'Implement strict 3-year crop rotation away from all Solanaceae crops'
      ],
      prevention: [
        'Install drip lines; never utilize overhead sprinkler irrigation',
        'Apply deep organic straw mulch to create a barrier over soil-borne inoculum'
      ]
    },
    sampleImageUrl: blightLeafImageUrl,
    typicalSeverity: 'Moderate',
    contagionRisk: 'High'
  },
  {
    id: 'late_blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    pathogenType: 'Fungal',
    description: 'The infamous oomycete responsible for the historic Irish potato famine. Late blight is catastrophic, capable of completely collapsing an entire tomato field within 7-14 days during cool, humid, overcast weather.',
    primarySymptoms: [
      'Large, irregular water-soaked dark greenish-gray to brown lesions',
      'Cottony white fungal sporulation visible on the underside of leaves in high humidity',
      'Rapid wilting and blackening of petioles and stems resembling frost damage',
      'Firm, rough, greasy brown decay on green and ripening tomatoes'
    ],
    earlyStageSigns: [
      'Pale, water-soaked flecks that expand rapidly without distinct margins',
      'Foliage appears scalded or frozen during early morning fog'
    ],
    advancedSigns: [
      'Total vine collapse, blackened foliage emitting a foul decaying odor',
      'Secondary bacterial soft rots liquefying the plant tissue'
    ],
    favorableConditions: {
      temperature: '15°C - 22°C (59°F - 72°F)',
      humidity: '> 90% RH with free moisture/dew on foliage for > 8 hours',
      spreadVector: 'Windborne sporangia travelling up to 50 kilometers'
    },
    treatment: {
      organic: [
        'Emergency application of fixed copper hydroxide at first warning',
        'Immediately rogue out and destroy severely infected whole plants (do not compost)'
      ],
      chemical: [
        'Systemic specialized fungicides: Cyazofamid, Fluopicolide, or Mandipropamid',
        'Curative metalaxyl/mefenoxam treatments where resistance is not present'
      ],
      cultural: [
        'Space plants generously (minimum 75 cm) to allow rapid foliage drying',
        'Destroy all voluntary tomato and nightshade weeds near the greenhouse'
      ],
      prevention: [
        'Plant resistant cultivars (e.g., Mountain Magic, Defiant, Plum Regal)',
        'Monitor regional late-blight forecast alerts and initiate early protection'
      ]
    },
    sampleImageUrl: blightLeafImageUrl,
    typicalSeverity: 'Severe',
    contagionRisk: 'Critical'
  },
  {
    id: 'bacterial_spot',
    name: 'Bacterial Spot',
    scientificName: 'Xanthomonas campestris pv. vesicatoria',
    pathogenType: 'Bacterial',
    description: 'A persistent seed- and soil-borne bacterial disease producing angular, water-soaked lesions that become sunken, scab-like, and dark brown. Warm rainfall and overhead watering accelerate severe outbreaks.',
    primarySymptoms: [
      'Small (1-3 mm) angular, dark brown to black circular spots',
      'Lesions frequently surrounded by a narrow chlorotic halo',
      'Centers of lesions may tear or fall out, giving leaves a ragged "shot-hole" look',
      'Slightly raised blister-like scabs on green tomato fruit'
    ],
    earlyStageSigns: [
      'Water-soaked translucent flecks visible against sunlight',
      'Pinpoint dark dots on seedling cotyledons'
    ],
    advancedSigns: [
      'Severe blighting and general yellowing of whole leaf branches',
      'Significant blossom drop causing severe harvest reduction'
    ],
    favorableConditions: {
      temperature: '25°C - 30°C (77°F - 86°F)',
      humidity: 'Prolonged leaf wetness and warm driving rain',
      spreadVector: 'Contaminated seed batches, tool transmission, overhead irrigation'
    },
    treatment: {
      organic: [
        'Liquid copper bactericide combined with Bacillus amyloliquefaciens',
        'Apply organic potassium silicate to strengthen plant cell wall thickness'
      ],
      chemical: [
        'Tank mix of copper hydroxide with Mancozeb (synergistic bactericidal action)',
        'Actigard (Acibenzolar-S-methyl) to activate systemic acquired resistance (SAR)'
      ],
      cultural: [
        'Never handle or prune wet tomato plants to avoid mechanical bacterial inoculation',
        'Disinfect all stakes, trellis wires, and greenhouse tables with 10% bleach'
      ],
      prevention: [
        'Purchase certified pathogen-free seeds tested for Xanthomonas',
        'Soak seeds in hot water (50°C / 122°F for 25 minutes) before sowing'
      ]
    },
    sampleImageUrl: blightLeafImageUrl,
    typicalSeverity: 'Moderate',
    contagionRisk: 'High'
  },
  {
    id: 'septoria_leaf_spot',
    name: 'Septoria Leaf Spot',
    scientificName: 'Septoria lycopersici',
    pathogenType: 'Fungal',
    description: 'One of the most prolific tomato foliage diseases. It is characterized by hundreds of small circular spots with distinct dark brown margins and sunken ash-gray centers containing tiny black pycnidia (fruiting bodies).',
    primarySymptoms: [
      'Circular spots (2-4 mm) with distinctive tan-to-gray centers and dark borders',
      'Tiny black speckles (pycnidia) clearly visible in center of spots with hand lens',
      'Leaves rapidly turn yellow around lesions, wither, curl, and drop off',
      'Progression starts strictly on oldest leaves closest to soil surface'
    ],
    earlyStageSigns: [
      'Dense speckling on lowest leaves after periods of continuous rain',
      'Individual spots remain uniform in size without expanding into large blots'
    ],
    advancedSigns: [
      'Complete skeletonization/defoliation of the lower two-thirds of the vine',
      'Weakened plants with exposed fruit vulnerable to severe sunscald'
    ],
    favorableConditions: {
      temperature: '20°C - 25°C (68°F - 77°F)',
      humidity: '> 75% RH with continuous leaf dampness',
      spreadVector: 'Rain splashes releasing gelatinous pycnidiospores from leaf litter'
    },
    treatment: {
      organic: [
        'Copper sulfate or copper octanoate foliar spray applied every 7 days',
        'Immediate manual removal of all leaves showing gray-center spotting'
      ],
      chemical: [
        'Preventive applications of Chlorothalonil, Mancozeb, or Pyraclostrobin',
        'Rotate chemical classes to prevent fungal resistance'
      ],
      cultural: [
        'Trellis and stake vines vertically to elevate foliage away from soil',
        'Remove all Solanaceous crop residues thoroughly in the autumn'
      ],
      prevention: [
        'Apply heavy 8 cm straw or plastic mulch around base of all stems',
        'Water exclusively with soaker hoses early in the morning'
      ]
    },
    sampleImageUrl: blightLeafImageUrl,
    typicalSeverity: 'Moderate',
    contagionRisk: 'High'
  },
  {
    id: 'yellow_leaf_curl',
    name: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    scientificName: 'Begomovirus / TYLCV',
    pathogenType: 'Viral',
    description: 'A devastating viral disease vectored by the silverleaf whitefly (Bemisia tabaci). Infected plants exhibit extreme stunting, upward cup-shaped leaflet curling, interveinal chlorosis, and almost total blossom drop.',
    primarySymptoms: [
      'Upward rolling and curling of leaflets into a spoon-like or cupped shape',
      'Prominent interveinal chlorosis (margins turn bright yellow while veins stay green)',
      'Marked reduction in leaflet size, appearing crinkled, thick, and leathery',
      'Severe plant stunting with bush-like compact growth and zero fruit set'
    ],
    earlyStageSigns: [
      'Slight upward curl on newest apical growth leaves',
      'Faint marginal chlorosis on top leaves'
    ],
    advancedSigns: [
      'Floral abortion and complete cessation of vegetative vertical growth',
      'Existing green fruit fails to mature normally'
    ],
    favorableConditions: {
      temperature: '28°C - 35°C (82°F - 95°F)',
      humidity: 'Arid to moderate climates favorable for whitefly population blooms',
      spreadVector: 'Silverleaf whitefly (Bemisia tabaci) feeding on plant phloem'
    },
    treatment: {
      organic: [
        'Install yellow sticky traps (1 trap per 2-3 plants) to monitor and capture whiteflies',
        'Spray insecticidal soap or horticultural mineral oil to suffocate nymphs',
        'Introduce natural predators like Encarsia formosa parasitic wasps'
      ],
      chemical: [
        'Systemic neonicotinoids or Diamides (e.g., Cyantraniliprole) targeted at vector',
        'Pyriproxyfen or Spiromesifen insect growth regulators for whitefly suppression'
      ],
      cultural: [
        'Install 50-mesh insect netting over all greenhouse ventilation openings',
        'Immediately rogue out infected viral plants; place in sealed bags before disposal'
      ],
      prevention: [
        'Plant TYLCV-resistant hybrids (e.g., Tycoon, Chephren, Charger)',
        'Maintain a 2-month host-free crop break between production seasons'
      ]
    },
    sampleImageUrl: blightLeafImageUrl,
    typicalSeverity: 'Severe',
    contagionRisk: 'Critical'
  },
  {
    id: 'leaf_mold',
    name: 'Leaf Mold',
    scientificName: 'Passalora fulva (Cladosporium fulvum)',
    pathogenType: 'Fungal',
    description: 'A major greenhouse fungal disease. Pale yellowish-green spots develop on the upper leaf surface, while a dense, velvety olive-green to brown spore mat blankets the corresponding underside of the leaf.',
    primarySymptoms: [
      'Indistinct pale green to bright yellow patches on upper leaf surface',
      'Plush, velvety olive-green to grayish-brown mold on leaf underside',
      'Infected leaves turn brown, wither, and curl prematurely without falling off',
      'Rarely infects fruit, but dramatically diminishes photosynthetic yield'
    ],
    earlyStageSigns: [
      'Faint light green spots easily mistaken for nutrient deficiency',
      'Fine fuzzy pale gray fungal down starting beneath lower foliage'
    ],
    advancedSigns: [
      'Under-leaf felt turns rich chocolate brown as billions of conidia mature',
      'Complete canopy collapse under humid greenhouse conditions'
    ],
    favorableConditions: {
      temperature: '21°C - 24°C (70°F - 75°F)',
      humidity: '> 85% RH (very common in enclosed tunnels and winter greenhouses)',
      spreadVector: 'Conidia dispersed through air currents and worker handling'
    },
    treatment: {
      organic: [
        'Copper-based fungicidal sprays applied directly to underside of leaves',
        'Bio-fungicide sprays containing Streptomyces lydicus or Bacillus subtilis'
      ],
      chemical: [
        'Triazole fungicides (e.g., Difenoconazole) or Boscalid in commercial settings',
        'Ensure alternating FRAC fungicide modes of action to avert resistance'
      ],
      cultural: [
        'Maximize ventilation: run horizontal air fans continuously in greenhouses',
        'Elevate greenhouse temperature at dusk to lower relative humidity below 80%'
      ],
      prevention: [
        'Select leaf-mold resistant cultivars containing Cf genes (e.g., Cf-9, Cf-19)',
        'Prune lower suckers to maintain open, breathable canopy structure'
      ]
    },
    sampleImageUrl: healthyLeafImageUrl,
    typicalSeverity: 'Moderate',
    contagionRisk: 'Medium'
  },
  {
    id: 'spider_mites',
    name: 'Two-Spotted Spider Mite',
    scientificName: 'Tetranychus urticae',
    pathogenType: 'Pest',
    description: 'Microscopic arachnids that pierce plant epidermal cells and ingest chlorophyll sap. Their infestation produces dense yellow stippling, chlorotic bronzing, and delicate silk webbing across leaf axils and growing tips.',
    primarySymptoms: [
      'Thousands of minute pale yellow or white stipples (dots) on upper leaf lamina',
      'Leaves acquire a dull, bronzed, dusty, or scorched appearance',
      'Fine silky webbing covering the underside of leaves and branch crotches',
      'Presence of microscopic 8-legged mites visible moving when tapped onto white paper'
    ],
    earlyStageSigns: [
      'Isolated cluster of bleached pinpoint speckles on upper leaf surface',
      'Faint webbing visible only in direct angular light'
    ],
    advancedSigns: [
      'Canopy enveloped in dense protective silken webs; leaves turn brown and drop',
      'Total vine desiccation and stunted fruit development'
    ],
    favorableConditions: {
      temperature: '27°C - 38°C (80°F - 100°F)',
      humidity: '< 40% RH (Hot, arid, dusty drought conditions trigger explosive outbreaks)',
      spreadVector: 'Wind ballooning on silk threads, clothing transfer, contaminated tools'
    },
    treatment: {
      organic: [
        'Release predatory mites: Phytoseiulus persimilis or Neoseiulus californicus',
        'Foliar spray with organic insecticidal soap or 1% cold-pressed neem oil',
        'High-pressure water rinse to knock down mite colonies and eliminate webbing'
      ],
      chemical: [
        'Selective miticides: Bifenazate, Abamectin, or Etoxazole (spares pollinators)',
        'Avoid broad-spectrum synthetic pyrethroids which kill natural mite predators'
      ],
      cultural: [
        'Dampen greenhouse walkways to raise ambient humidity above 60%',
        'Eradicate all broadleaf weeds around field edges that serve as winter reservoirs'
      ],
      prevention: [
        'Scout regularly with a 10x-20x botanical hand lens',
        'Avoid excessive nitrogen fertilization which produces soft, sugary leaf tissue'
      ]
    },
    sampleImageUrl: healthyLeafImageUrl,
    typicalSeverity: 'Moderate',
    contagionRisk: 'High'
  },
  {
    id: 'target_spot',
    name: 'Target Spot',
    scientificName: 'Corynespora cassiicola',
    pathogenType: 'Fungal',
    description: 'A warm-climate fungal pathogen causing pinpoint necrotic lesions that enlarge into circular brown lesions with subtle concentric rings and noticeable light brown centers, attacking leaves, stems, and blossoms.',
    primarySymptoms: [
      'Small brown circular spots that expand with concentric rings and pale centers',
      'Upper canopy lesions often rupture, producing ragged necrotic holes',
      'Dark elongated lesions on petioles and primary vines',
      'Sunken circular crater-like brown lesions on tomato fruit'
    ],
    earlyStageSigns: [
      'Tiny pinpoint brown flecks on intermediate foliage layer',
      'Yellow halos developing around 3-5 mm lesions'
    ],
    advancedSigns: [
      'Widespread upper canopy necrosis and extensive fruit rot',
      'Premature vine death during peak fruit maturation'
    ],
    favorableConditions: {
      temperature: '25°C - 32°C (77°F - 90°F)',
      humidity: '> 80% RH accompanied by long dew periods',
      spreadVector: 'Airborne conidia and rain splash'
    },
    treatment: {
      organic: [
        'Copper hydroxide or copper oxychloride preventive foliar applications',
        'Bio-fungicides based on Bacillus pumilus'
      ],
      chemical: [
        'Fungicides containing Fluxapyroxad, Pyraclostrobin, or Penthiopyrad',
        'Chlorothalonil applications on a 7-10 day schedule in high-risk seasons'
      ],
      cultural: [
        'Increase row spacing to improve sunshine penetration and air movement',
        'Prune inner lateral sucker shoots to prevent dense tangled canopies'
      ],
      prevention: [
        'Rotate away from susceptible host crops including soybeans and cucumbers',
        'Deep plow or remove all crop debris post-harvest'
      ]
    },
    sampleImageUrl: blightLeafImageUrl,
    typicalSeverity: 'Moderate',
    contagionRisk: 'Medium'
  },
  {
    id: 'mosaic_virus',
    name: 'Tomato Mosaic Virus (ToMV)',
    scientificName: 'Tobamovirus / ToMV',
    pathogenType: 'Viral',
    description: 'An extraordinarily stable and mechanically infectious plant virus. Leaves display light and dark green mosaic mottling, blistering, shoestring leaf distortion, and internal brown necrosis in ripening tomatoes.',
    primarySymptoms: [
      'Mottled alternating patterns of light green, dark green, and yellow across leaf',
      'Distorted, blistered, crinkled lamina with severe "shoestring" narrowing',
      'Stunting of overall vine height with bushy abnormal side branching',
      'Internal browning (brown wall) within the flesh of mature tomato fruit'
    ],
    earlyStageSigns: [
      'Faint variegation or patchy green tones on newly emerging terminal leaves',
      'Slight downward curling of leaf tips'
    ],
    advancedSigns: [
      'Leaflets reduced to thin vein ribbons (fern-leaf symptom)',
      'Severe yield collapse with mottled, unmarketable fruit'
    ],
    favorableConditions: {
      temperature: '20°C - 28°C (68°F - 82°F)',
      humidity: 'Wide tolerance; viral particles remain infectious for years in dry state',
      spreadVector: 'Mechanical contact via worker hands, tools, grafting, and tobacco products'
    },
    treatment: {
      organic: [
        'No direct curative virucide exists for plant viruses',
        'Immediately rogue out and incinerate infected plants to protect remaining crop'
      ],
      chemical: [
        'Dip all tools in 20% non-fat dry milk solution or 10% trisodium phosphate (TSP) to deactivate viral coat protein',
        'Disinfect entire greenhouse structure between plantings'
      ],
      cultural: [
        'Strictly prohibit tobacco smoking or handling near tomato facilities',
        'Wash hands thoroughly with soap before and after touching any plant'
      ],
      prevention: [
        'Plant certified resistant cultivars with Tm-2 or Tm-2^2 resistance alleles',
        'Purchase certified tested virus-free seed from reputable seed banks'
      ]
    },
    sampleImageUrl: blightLeafImageUrl,
    typicalSeverity: 'Severe',
    contagionRisk: 'Critical'
  }
];

export const STEAM_EXHIBITION_SAMPLES: SampleLeaf[] = [
  {
    id: 'sample_healthy',
    title: 'Specimen A: Prime Foliage',
    condition: 'Healthy Leaf (Control)',
    pathogen: 'Healthy',
    imageUrl: healthyLeafImageUrl,
    description: 'High-chlorophyll control specimen exhibiting intact cuticle and normal trichome density.'
  },
  {
    id: 'sample_early_blight',
    title: 'Specimen B: Target Spotting',
    condition: 'Early Blight (Alternaria solani)',
    pathogen: 'Fungal',
    imageUrl: blightLeafImageUrl,
    description: 'Classic concentric target ring lesions surrounded by chlorotic yellow halos.'
  },
  {
    id: 'sample_late_blight',
    title: 'Specimen C: Oomycete Blight',
    condition: 'Late Blight (Phytophthora infestans)',
    pathogen: 'Fungal',
    imageUrl: blightLeafImageUrl,
    description: 'Rapidly spreading water-soaked necrosis with tissue desiccation.'
  },
  {
    id: 'sample_bacterial_spot',
    title: 'Specimen D: Bacterial Lesions',
    condition: 'Bacterial Spot (Xanthomonas)',
    pathogen: 'Bacterial',
    imageUrl: blightLeafImageUrl,
    description: 'Angular dark brown necrotic flecks with micro-perforations.'
  },
  {
    id: 'sample_yellow_curl',
    title: 'Specimen E: Viral Curling',
    condition: 'Yellow Leaf Curl Virus',
    pathogen: 'Viral',
    imageUrl: blightLeafImageUrl,
    description: 'Interveinal yellowing with upward cupped leaflet deformation.'
  }
];
