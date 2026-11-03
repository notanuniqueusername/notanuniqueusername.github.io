'use strict';
window.projectIndex = [
  {
    id: 'workbook', title: 'University mathematics workbook.', shortTitle: 'Mathematics Workbook',
    collection: 'university', category: 'math', categoryLabel: 'UNIVERSITY COURSEWORK · MATHEMATICS', number: 'U1',
    repo: 'Basics_of_Mathematics_Student_Workbook_2026',
    description: 'My university mathematics coursework, with worked solutions and interactive explanations for algebra, geometry, and calculus.',
    previewCaption: 'ALGEBRA · GEOMETRY · CALCULUS',
    tags: ['Algebra', 'Geometry', 'Calculus'], metric: '177', metricLabel: 'worked exercises',
    brief: 'For university, I expanded the original mathematics student workbook with step-by-step solutions and interactive illustrations. The collection covers algebra, vector geometry, curves and surfaces, and five calculus topics.',
    methods: ['Organized the worked solutions into twelve topic collections.', 'Added visual explanations for matrix operations, spatial geometry, and surface sections.', 'Included interactive examples for tangents, accumulation, a folding box, and solids of revolution.'],
    result: '177 exercise pages, with explanations, animations, and controls that run entirely in the browser.',
    context: 'University coursework based on a fork of the original student workbook. My personal ML and data projects are listed separately above.',
    live: 'https://notanuniqueusername.github.io/Basics_of_Mathematics_Student_Workbook_2026/'
  },
  {
    id: 'taxi', title: 'NYC taxi trip analysis.', shortTitle: 'NYC Taxi Analysis',
    collection: 'personal', category: 'data', categoryLabel: 'DATA ANALYSIS & ENGINEERING', number: '01', repo: 'pyspark_nyc_taxi',
    description: 'An analysis of 3.57 million NYC yellow taxi trips with PySpark: demand, popular routes, fares, and tipping patterns.',
    previewCaption: 'TRIP DATA → SPARK SQL → PATTERNS',
    tags: ['PySpark', 'Spark SQL', 'EDA'], metric: '3.57M', metricLabel: 'raw trip records',
    brief: 'This project follows NYC yellow taxi trips through August 2025, from raw records to patterns in demand and fares. I used PySpark 4.0 on Google Colab for cleaning, SQL analysis, outlier detection, and performance comparisons.',
    methods: ['Filtered invalid records and explored hourly, daily, and geographic patterns.', 'Compared peak and off-peak trips, popular routes, and tipping behavior with Spark SQL.', 'Investigated caching, broadcast joins, partitioning, correlations, and IQR-based outliers.'],
    result: 'Cleaning retained 2,511,464 of 3,574,091 records. Distance and fare had a correlation of 0.827, and caching improved the measured runtime by 24.9%.',
    context: 'Results apply to the August 2025 dataset and this experiment setup. The notebook includes the analysis and performance comparisons.'
  },
  {
    id: 'yolo', title: 'Video object detection with YOLO.', shortTitle: 'YOLO Object Detection',
    collection: 'personal', category: 'ml', categoryLabel: 'COMPUTER VISION', number: '02', repo: 'yolo_iou',
    description: 'Video object detection with YOLO11n, evaluated against manually annotated bounding boxes using intersection over union.',
    previewCaption: 'VIDEO → BOUNDING BOXES → IoU',
    tags: ['YOLO11n', 'Video', 'IoU'], metric: '0.9643', metricLabel: 'mean IoU · 3 frames',
    brief: 'How closely do the predicted boxes match the object? For this experiment, I ran pretrained YOLO11n on video and checked its predictions against manual ground truth annotations, using a confidence threshold of 0.4.',
    methods: ['Ran YOLO11n on the input video.', 'Manually annotated the target object on frames 50, 120, and 200.', 'Calculated intersection over union between the predicted and reference boxes.'],
    result: 'IoU scores of 0.9692, 0.9503, and 0.9734 gave a mean of 0.9643 across the three annotated frames.',
    context: 'This is a small, three-frame evaluation. More videos and varied conditions would be needed to assess general detection performance.'
  },
  {
    id: 'cats', title: 'Cats vs. dogs image classifier.', shortTitle: 'Cats vs. Dogs Classifier',
    collection: 'personal', category: 'ml', categoryLabel: 'TRANSFER LEARNING', number: '03', repo: 'cats_vs_dogs',
    description: 'A cats-versus-dogs classifier built on MobileNetV2, using transfer learning and image augmentation across five training epochs.',
    previewCaption: 'IMAGE → MobileNetV2 → CAT OR DOG',
    tags: ['MobileNetV2', 'ImageNet', 'Classification'], metric: '97.18%', metricLabel: 'best validation accuracy',
    brief: 'For this classifier, I used MobileNetV2 pretrained on ImageNet. The backbone stayed frozen while a new classification head learned to distinguish cats from dogs.',
    methods: ['Resized images to 224 × 224 and used an 80/20 training–validation split.', 'Applied rotations, shifts, shear, zoom, and horizontal flips as augmentation.', 'Trained a pooling, dropout, and sigmoid classification head for five epochs with Adam and binary crossentropy.'],
    result: 'Best validation accuracy reached 97.18% at epoch four. Final validation loss was 0.0814.',
    context: 'These figures come from the validation split. A separate held-out test score is not included.'
  },
  {
    id: 'bert', title: 'Sentiment analysis with BERT.', shortTitle: 'BERT Sentiment Analysis',
    collection: 'personal', category: 'ml', categoryLabel: 'NATURAL LANGUAGE PROCESSING', number: '04', repo: 'bert_sentiment_analysis',
    description: 'Sentiment classification with BERT, with accuracy, F1, AUC–ROC, and error rates used to evaluate its predictions.',
    previewCaption: 'TEXT → BERT → SENTIMENT',
    tags: ['BERT', 'NLP', 'Evaluation'], metric: '0.9766', metricLabel: 'AUC–ROC',
    brief: 'A notebook exploring text sentiment with BERT. Alongside the headline accuracy, I recorded precision, recall, specificity, and error rates to give a fuller picture of the classification results.',
    methods: ['Organized separate data partitions for training, validation, and final evaluation.', 'Recorded accuracy, precision, recall, F1, specificity, and AUC–ROC.', 'Included false-positive and false-negative rates in the evaluation.'],
    result: 'The recorded metrics include 92.76% accuracy, an F1 score of 0.9276, and an AUC–ROC of 0.9766.',
    context: 'These figures describe this sentiment-analysis experiment. The notebook contains the implementation and evaluation details.'
  }
];
