import React, { useContext } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { ThemeContext } from '../context/ThemeContext'; 

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsChart = () => {
  const { currentColors } = useContext(ThemeContext); 

  // Chart data configuration - values set to 50 as per previous request
  const data = {
    labels: [
      'Mobile Development',
      'Frontend',
      'Backend',
      'Databases',
      'DevOps',
      'Soft Skills'
    ],
    datasets: [
      {
        label: 'Skill Proficiency',
        data: [50, 50, 50, 50, 50, 50], // All values set to 50
        backgroundColor: currentColors.primary + '30', // Use primary color with transparency
        borderColor: currentColors.primary,
        borderWidth: 2,
        pointBackgroundColor: currentColors.primary,
        pointBorderColor: currentColors.background, // Use background for point border
        pointHoverBackgroundColor: currentColors.background,
        pointHoverBorderColor: currentColors.primary
      }
    ]
  };

  // Chart options with dynamic theme support using currentColors
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: currentColors.textSecondary + '30' // Lighter lines for both themes
        },
        grid: {
          color: currentColors.textSecondary + '30' // Lighter grid for both themes
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
          color: currentColors.text // Use main text color for ticks
        },
        pointLabels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: currentColors.text // Use main text color for point labels
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 20,
          color: currentColors.text // Use main text color for legend labels
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        },
        backgroundColor: currentColors.cardBg, // Use card background for tooltip
        titleColor: currentColors.text, // Use main text for tooltip title
        bodyColor: currentColors.textSecondary, // Use secondary text for tooltip body
        borderColor: currentColors.cardBorder, // Use card border for tooltip border
        borderWidth: 1
      }
    },
    elements: {
      line: {
        tension: 0.1
      }
    },
    maintainAspectRatio: false
  };

  // Skill card colors using currentColors for consistency
  const skillCards = [
    {
      title: "Mobile Development",
      skills: "Flutter, Dart, Firebase",
      value: 50, // Set to 50
      bgColor: currentColors.primary + '10', // Use primary with transparency
      textColor: currentColors.primary,
      progressColor: currentColors.primary
    },
    {
      title: "Frontend",
      skills: "React, Redux, Tailwind",
      value: 50, // Set to 50
      bgColor: currentColors.secondary + '10', // Use secondary with transparency
      textColor: currentColors.secondary,
      progressColor: currentColors.secondary
    },
    {
      title: "Backend",
      skills: "Spring Boot, REST APIs",
      value: 50, // Set to 50
      bgColor: currentColors.accent + '10', // Use accent with transparency
      textColor: currentColors.accent,
      progressColor: currentColors.accent
    },
    {
      title: "Databases",
      skills: "MySQL, PostgreSQL, Firestore",
      value: 50, // Set to 50
      bgColor: currentColors.tertiary + '10', // Use tertiary with transparency
      textColor: currentColors.tertiary,
      progressColor: currentColors.tertiary
    },
    {
      title: "DevOps",
      skills: "Docker, Jenkins, CI/CD",
      value: 50, // Set to 50
      bgColor: currentColors.primary + '10', // Reusing primary for variety
      textColor: currentColors.primary,
      progressColor: currentColors.primary
    },
    {
      title: "Soft Skills",
      skills: "Leadership, Collaboration",
      value: 50, // Set to 50
      bgColor: currentColors.secondary + '10', // Reusing secondary for variety
      textColor: currentColors.secondary,
      progressColor: currentColors.secondary
    }
  ];

  return (
    <div className={`p-6 rounded-xl shadow-md`} style={{ backgroundColor: currentColors.cardBg }}>
      <h2 className={`text-2xl font-bold mb-6`} style={{ color: currentColors.text }}>
        Technical Skills Radar Chart
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Radar Chart */}
        <div className="h-96">
          <Radar data={data} options={options} />
        </div>
        
        {/* Right Column - Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillCards.map((skill, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg`}
              style={{ backgroundColor: skill.bgColor }}
            >
              <h3 className={`font-semibold`} style={{ color: skill.textColor }}>{skill.title}</h3>
              <p className={`text-sm`} style={{ color: currentColors.textSecondary }}>
                {skill.skills}
              </p>
              <div className={`h-2 rounded-full mt-2`} style={{ backgroundColor: currentColors.backgroundAlt }}>
                <div 
                  className={`h-2 rounded-full`} 
                  style={{ width: `${skill.value}%`, backgroundColor: skill.progressColor }}
                ></div>
              </div>
              <p className={`text-xs mt-1`} style={{ color: currentColors.textSecondary }}>
                {skill.value}% proficiency
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsChart;
