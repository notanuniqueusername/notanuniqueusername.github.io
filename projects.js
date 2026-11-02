'use strict';
window.projectIndex = [
  {
    id: 'workbook', title: 'Mathematics, made tangible.', shortTitle: 'Mathematics Workbook',
    collection: 'university', category: 'math', categoryLabel: 'UNIVERSITY COURSEWORK · MATHEMATICS', number: 'U1',
    repo: 'Basics_of_Mathematics_Student_Workbook_2026',
    description: 'University mathematics coursework: worked solutions, animations, and interactive diagrams for algebra, geometry, and calculus.',
    tags: ['Algebra', 'Geometry', 'Calculus'], metric: '177', metricLabel: 'worked exercises',
    brief: 'A university coursework resource based on the original mathematics student workbook. It pairs step-by-step explanations with interactive illustrations, covering algebra, vector geometry, curves and surfaces, and five calculus topics.',
    methods: ['Read complete worked solutions across twelve topic collections.', 'Explore matrix operations, rotatable spatial diagrams, and adjustable surface sections.', 'Move tangents, inspect signed accumulation, fold a box, and trace a solid of revolution.'],
    result: '177 exercise pages across Algebra, Geometry, and Calculus. All rendering, animations, and controls run in the browser.',
    context: 'University coursework, separate from my personal ML and data projects. Adapted and extended from the original student workbook; the GitHub repository is a fork.',
    live: 'https://notanuniqueusername.github.io/Basics_of_Mathematics_Student_Workbook_2026/'
  },
  {
    id: 'taxi', title: 'A city in 3.5 million trips.', shortTitle: 'NYC Taxi Analysis',
    collection: 'personal', category: 'data', categoryLabel: 'DATA ANALYSIS & ENGINEERING', number: '01', repo: 'pyspark_nyc_taxi',
    description: 'Cleaning and exploring NYC yellow taxi records with PySpark. Routes, fares, tipping patterns, and the rhythm of a city.',
    tags: ['PySpark', 'Spark SQL', 'EDA'], metric: '3.57M', metricLabel: 'raw trip records',
    brief: 'An analysis of August 2025 NYC yellow taxi trips using PySpark 4.0 on Google Colab. The workflow starts with data cleaning and continues through exploratory analysis, SQL queries, performance optimization, and outlier detection.',
    methods: ['Remove invalid records and inspect hourly, daily, and geographic patterns.', 'Compare peak and off-peak trips, popular routes, and tipping behavior with Spark SQL.', 'Explore caching, broadcast joins, partitioning, correlations, and IQR-based outliers.'],
    result: 'The README reports 3,574,091 raw records and 2,511,464 clean records; a distance–fare correlation of 0.827; and a 24.9% caching improvement.',
    context: 'Reported results describe this dataset and experiment. They are not a general performance benchmark.'
  },
  {
    id: 'yolo', title: 'Finding the object. Measuring the overlap.', shortTitle: 'YOLO Object Detection',
    collection: 'personal', category: 'ml', categoryLabel: 'COMPUTER VISION', number: '02', repo: 'yolo_iou',
    description: 'Video object detection with YOLO11n, checked against manually annotated bounding boxes using intersection over union.',
    tags: ['YOLO11n', 'Video', 'IoU'], metric: '0.9643', metricLabel: 'mean IoU · 3 frames',
    brief: 'A focused object-detection experiment using pretrained YOLO11n on video, with a confidence threshold of 0.4. Predictions are compared against manual ground truth annotations.',
    methods: ['Run pretrained YOLO11n on the input video.', 'Annotate the target object on frames 50, 120, and 200.', 'Measure intersection over union between predicted and reference bounding boxes.'],
    result: 'The README reports IoU scores of 0.9692, 0.9503, and 0.9734; the mean is 0.9643.',
    context: 'Evaluation covers three manually annotated frames. This small sample does not establish general detection accuracy.'
  },
  {
    id: 'cats', title: 'Two classes. A head start.', shortTitle: 'Cats vs. Dogs Classifier',
    collection: 'personal', category: 'ml', categoryLabel: 'TRANSFER LEARNING', number: '03', repo: 'cats_vs_dogs',
    description: 'A cats-versus-dogs image classifier built on MobileNetV2. Transfer learning, image augmentation, and five epochs of training.',
    tags: ['MobileNetV2', 'ImageNet', 'Classification'], metric: '97.18%', metricLabel: 'best validation accuracy',
    brief: 'A binary image-classification experiment with an ImageNet-pretrained MobileNetV2 backbone. The backbone stays frozen while a pooling, dropout, and sigmoid classification head learns the task.',
    methods: ['Resize inputs to 224 × 224 and use an 80/20 training–validation split.', 'Apply rotation, shifts, shear, zoom, and horizontal flips as augmentation.', 'Train the classification head for five epochs using Adam and binary crossentropy.'],
    result: 'The README reports a best validation accuracy of 97.18% at epoch four and a final validation loss of 0.0814.',
    context: 'Validation results come from the reported split. A separate held-out test result is not listed in the README.'
  },
  {
    id: 'bert', title: 'Reading between the tokens.', shortTitle: 'BERT Sentiment Analysis',
    collection: 'personal', category: 'ml', categoryLabel: 'NATURAL LANGUAGE PROCESSING', number: '04', repo: 'bert_sentiment_analysis',
    description: 'A BERT sentiment-analysis notebook, with classification metrics and separate training, validation, and test partitions.',
    tags: ['BERT', 'NLP', 'Evaluation'], metric: '0.9766', metricLabel: 'reported AUC–ROC',
    brief: 'A notebook project exploring sentiment analysis with BERT. Its README outlines separate training, validation, and test partitions and reports several classification metrics.',
    methods: ['Use separate partitions for model training, validation, and final evaluation.', 'Review accuracy, precision, recall, F1, specificity, and AUC–ROC.', 'Inspect false-positive and false-negative rates alongside headline metrics.'],
    result: 'The README reports 92.76% accuracy, an F1 score of 0.9276, and an AUC–ROC of 0.9766.',
    context: 'The README does not identify the dataset or specify which partition produced the metric table. Consult the notebook for experiment details.'
  }
];
