import Link from "next/link";
import Image from "next/image";
import { projects } from "./data/projects";
import WorkCard from "./components/WorkCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-24 md:pt-32">
      <div className="mb-16 md:mb-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          Hi, I'm Faizan
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl">
          UX/Product designer at <Link href="https://swapp.com" className="underline underline-offset-4 hover:text-gray-600 transition-colors">Swapp</Link>. I love working with early-stage teams, blending UX, UI, and business strategy to launch impactful features.
        </p>
      </div>

      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold" id="work">Work</h2>
          <Link href="/#work" className="text-lg hover:text-gray-600 transition-colors">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Row 1: 40% 60% */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <WorkCard
                title={projects[0].title}
                subtitle={projects[0].subtitle}
                image={projects[0].image}
                link={`/work/${projects[0].id}`}
                tags={projects[0].tags}
                index={0}
                color={projects[0].color}
                hoverColor="#CAC2FF"
              />
            </div>
            <div className="md:col-span-2">
              <WorkCard
                title={projects[1].title}
                subtitle={projects[1].subtitle}
                image={projects[1].image}
                link={`/work/${projects[1].id}`}
                tags={projects[1].tags}
                index={1}
                color={projects[1].color}
                hoverColor="#FFD6D6"
              />
            </div>
          </div>

          {/* Row 2: 100% */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-5">
              <WorkCard
                title={projects[2].title}
                subtitle={projects[2].subtitle}
                image={projects[2].image}
                link={`/work/${projects[2].id}`}
                tags={projects[2].tags}
                index={2}
                color={projects[2].color}
                hoverColor="#F7E8CA"
              />
            </div>
          </div>

          {/* Row 3: 60% 40% */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <WorkCard
                title={projects[3].title}
                subtitle={projects[3].subtitle}
                image={projects[3].image}
                link={`/work/${projects[3].id}`}
                tags={projects[3].tags}
                index={3}
                color={projects[3].color}
                hoverColor="#CAC2FF"
              />
            </div>
            {projects.length > 4 && (
              <div className="md:col-span-2">
                <WorkCard
                  title={projects[4].title}
                  subtitle={projects[4].subtitle}
                  image={projects[4].image}
                  link={`/work/${projects[4].id}`}
                  tags={projects[4].tags}
                  index={4}
                  color={projects[4].color}
                  hoverColor="#B8E8FF"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Playground</h2>
          <Link href="/playground" className="text-lg hover:text-gray-600 transition-colors">
            View all
          </Link>
        </div>

        <Link href="/playground" className="group">
          <div className="bg-gray-100 h-80 rounded-2xl overflow-hidden transition-all duration-300 ease-out-expo group-hover:shadow-md group-hover:bg-gray-200 relative">
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h3 className="text-2xl font-bold mb-2">Playground</h3>
              <p className="opacity-80 group-hover:opacity-100 transition-all duration-300 ease-out-expo">Explore side projects & experiments</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}