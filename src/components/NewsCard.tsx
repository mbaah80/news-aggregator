import React, { useState } from "react";
import { Card, Typography, Space, Tag, Tooltip } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import { NewsArticle } from "../types";
import { useNewsStore } from "../store";

const { Text, Paragraph } = Typography;

// Use a placeholder image URL (you can replace this with any other default news image URL)
const DEFAULT_IMAGE_URL =
  "https://placehold.co/600x400/e2e8f0/475569?text=News";

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { toggleFavorite, isFavorite } = useNewsStore();

  const {
    id,
    title,
    description,
    url,
    imageUrl,
    publishedAt,
    source,
    author,
    category = "general",
  } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const categoryColor =
    {
      business: "blue",
      technology: "cyan",
      sports: "green",
      entertainment: "magenta",
      politics: "red",
      world: "orange",
      science: "purple",
      health: "lime",
    }[(category || "").toLowerCase()] || "default";

  // Format author name to prevent overflow
  const formatAuthor = (author: string | null) => {
    if (!author) return null;
    const name = author.replace("By ", "");
    return name.length > 20 ? `${name.substring(0, 20)}...` : name;
  };

  const isFavorited = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(article);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.share({
        title: title,
        text: description,
        url: url,
      });
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <Card
      hoverable
      className="h-full transition-all duration-300 hover:shadow-md relative group overflow-hidden rounded-xl border-0"
      cover={
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            alt={title}
            src={imageUrl || DEFAULT_IMAGE_URL}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_IMAGE_URL;
            }}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Tooltip title="Share">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <ShareAltOutlined className="text-gray-600 text-lg" />
              </button>
            </Tooltip>

            <Tooltip
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <button
                onClick={handleFavoriteClick}
                className={`w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105
                  ${
                    isFavorited
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-white/90 backdrop-blur-sm hover:bg-white"
                  }`}
              >
                {isFavorited ? (
                  <HeartFilled className="text-white text-lg" />
                ) : (
                  <HeartOutlined className="text-gray-600 text-lg" />
                )}
              </button>
            </Tooltip>
          </div>

          {/* Category Badge */}
          <Tag
            color={categoryColor}
            className="absolute bottom-4 left-4 m-0 uppercase text-xs tracking-wider font-medium px-3 py-1 rounded-full"
          >
            {category || "General"}
          </Tag>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-500">
          <Text type="secondary" className="font-medium">
            {source.name}
          </Text>
          <Space size={12}>
            {author && (
              <Tooltip title={author}>
                <Space className="truncate max-w-[150px]">
                  <UserOutlined />
                  <span className="truncate">{formatAuthor(author)}</span>
                </Space>
              </Tooltip>
            )}
          </Space>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group/title"
        >
          <Paragraph
            strong
            ellipsis={{ rows: 2 }}
            className="text-lg mb-2 group-hover/title:text-blue-600 transition-colors duration-300"
          >
            {title}
          </Paragraph>
        </a>

        <Paragraph
          type="secondary"
          ellipsis={{ rows: 2 }}
          className="text-sm leading-relaxed"
        >
          {description}
        </Paragraph>
        <Space>
          <CalendarOutlined />
          <span>{formattedDate}</span>
        </Space>
      </div>
    </Card>
  );
};

export default NewsCard;
