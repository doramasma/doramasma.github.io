export interface TimelineItem {
  type: 'blog' | 'project';
  title: string;
  date: string;
  description: string;
  link?: string;
  isNew?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  description: string;
  tag: 'Tech' | 'Life' | 'AI Safety' | 'Other';
  isNew?: boolean;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  tag: 'Tech' | 'Life' | 'AI Safety' | 'Other';
  description: string;
}