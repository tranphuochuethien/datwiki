import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import CategoryList from "@/components/CategoryList";
import NewsList from "@/components/NewsList";
import ArticleList from "@/components/ArticleList";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero / Welcome Section */}
      <Hero />

      {/* Flex Container for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* SIDEBAR TRÁI */}
        <Sidebar />

        {/* Main Content (Center + Right Space) */}
        <main className="flex-1 min-w-0 overflow-hidden">

          {/* Featured Categories */}
          <CategoryList />

          {/* Mới cập nhật */}
          <NewsList />

          {/* Trending Articles List */}
          <ArticleList />

        </main>
      </div>
    </div>
  );
}
