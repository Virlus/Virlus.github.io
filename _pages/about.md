---
permalink: /
title: "About me"
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

Hi there! I am a senior undergraduate from Shanghai Jiao Tong University.
Currently, I am a robotics researcher at [Machine Vision and Intelligence Group](https://www.mvig.org/) (supervised by [Prof. Cewu Lu](https://www.mvig.org/)). 
Besides, I'm a member of [Guozhi class](http://www.qingyuan.sjtu.edu.cn/c/Introductiongzb) (held by [Prof. Xiaoou Tang](https://www.ie.cuhk.edu.hk/faculty/tang-xiaoou-sean/)). 
Previously, I worked as a research intern at [OpenRobotLab](https://github.com/OpenRobotLab) (supervised by [Dr. Jiangmiao Pang](https://oceanpang.github.io/)). 
<!-- <a href='https://scholar.google.com/citations?user=pN95HCsAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a> -->

My research interest lies in **Robot manipulation and Embodied AI**. During off time, I am a music enthusiast, fond of a wide range of genres including Hip-Hop, R&B, Rock, Pop, and Electronic. Sports take up much of my leisure as well, among which basketball is my favourite. I am also a fan of travelling and cinematography.

<!-- My research interest includes neural machine translation and computer vision. I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->


# 🔥 News
- *2025.04*: &nbsp;🎉🎉 One paper (Novel Demonstration Generation with Gaussian Splatting Enables Robust One-Shot Manipulation) is accepted by RSS 2025!
- *2024.09*: &nbsp;🎉🎉 One paper (Learning H-Infinity Locomotion Control) is accepted by CoRL 2024! 
- *2023.08*: &nbsp; Joined [OpenRobotLab](https://github.com/OpenRobotLab).
- *2023.02*: &nbsp; Joined [Machine Vision and Intelligence Group](https://www.mvig.org/).

# 📝 Selected Publications

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">RSS 2025</div><img src='images/robosplat.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Novel Demonstration Generation with Gaussian Splatting Enables Robust One-Shot Manipulation](https://arxiv.org/pdf/2504.13175)

Sizhe Yang\*, **Wenye Yu\***, Jia Zeng, Jun Lv, Kerui Ren, Cewu Lu, Dahua Lin, Jiangmiao Pang†

[**[Project website]**](https://yangsizhe.github.io/robosplat/) 
[**[Paper]**](https://arxiv.org/pdf/2504.13175)
[**[Code]**](https://github.com/OpenRobotLab/RoboSplat/)

RoboSplat is framework that leverages 3D Gaussian Splatting (3DGS) to generate novel demonstrations for RGB-based policy learning in a one-shot manner, enabling robust performance across six types of visual generalization in the real world.

</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">CoRL 2024</div><img src='images/hinf.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Learning H-Infinity Locomotion Control](https://arxiv.org/pdf/2404.14405) 🎉 **<font color="lightcoral">Best Poster Award at CoRL 2024 LocoLearn Workshop</font>**

Junfeng Long\*, **Wenye Yu\***, Quanyi Li\*, Zirui Wang, Dahua Lin, Jiangmiao Pang†

[**[Project website]**](https://junfeng-long.github.io/HINF/) 
[**[Paper]**](https://arxiv.org/abs/2404.14405)

We propose H-Infinity Locomotion Control, an adversarial framework for quadrupedal robots which enhances their robustness against external forces with a performance guarantee. 

</div>
</div>

# 📝 Other Publications

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">IROS 2025</div><img src='images/sime.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[SIME: Enhancing Policy Self-Improvement with Modal-level Exploration](https://arxiv.org/abs/2505.01396)

Yang Jin\*, Jun Lv\*, **Wenye Yu**, Hongjie Fang, Yong-Lu Li, Cewu Lu†

[**[Project website]**](https://ericjin2002.github.io/SIME/) 
[**[Paper]**](https://arxiv.org/pdf/2505.01396)
[**[Code]**](https://github.com/EricJin2002/SIME)

With modal-level exploration, the robot can generate more diverse and multi-modal interaction data.
By learning from the most valuable trials and high-quality segments from these interactions,
the robot can effectively refine its capabilities through self-improvement.

</div>
</div>

<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv</div><img src='images/grutopia.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[GRUtopia: Dream General Robots in a City at Scale](https://www.arxiv.org/abs/2407.10943)

Hanqing Wang\*, Jiahe Chen\*, Wensi Huang\*, Qingwei Ben\*, Tai Wang\*, Boyu Mi\*, Tao Huang, Siheng Zhao, Yilun Chen, Sizhe Yang, Peizhou Cao, **Wenye Yu**, Zichao Ye, Jialun Li, Junfeng Long, Zirui Wang, Huiling Wang, Ying Zhao, Zhongying Tu, Yu Qiao, Dahua Lin, Jiangmiao Pang†

[**[Project website]**](https://github.com/OpenRobotLab/GRUtopia) 
[**[Paper]**](https://www.arxiv.org/abs/2407.10943)
[**[Code]**](https://github.com/OpenRobotLab/GRUtopia)

We proposed GRUtopia, the first simulated interactive 3D society designed for various robots. It features (a)GRScenes, a dataset with 100k interactive and finely annotated scenes. (b) GRResidents, a LLM driven NPC system. (c) GRBench, a benchmark posing moderately challenging tasks.

</div>
</div> -->

<!-- - [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet](https://github.com), A, B, C, **CVPR 2020** -->

# 🎖 Honors and Awards
- *2024.06* **SenseTime Scholarship** (25/year in China)
- *2023.09* **National Scholarship**
- *2022.09* **National Scholarship** (Highest Honor for undergraduates in China)

# 📖 Educations
- *2021.09 - now*, Shanghai Jiao Tong University
- *2018.09 - 2021.06*, Shanghai High School 
- TOEFL score: 110 [Listening: 28, Reading: 30, Speaking: 25, Writing: 27] (first time)
- CET6 score: 677 (first time)

<!-- # 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/) -->

# 💻 Experiences
- *2023.02 - now*, [Machine Vision and Intelligence Group](https://www.mvig.org/), Shanghai Jiao Tong University.
- *2023.08 - 2025.04*, [OpenRobotLab](https://github.com/OpenRobotLab), Shanghai AI Laboratory.
